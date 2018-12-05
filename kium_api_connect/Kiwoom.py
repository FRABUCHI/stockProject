from PyQt5.QAxContainer import *
from PyQt5.QtCore import *
import time
import pandas as pd
from datetime import date, timedelta


class Kiwoom(QAxWidget):
    def __init__(self):
        super().__init__()

        self.day = (date.today() - timedelta(1)).strftime('%Y%m%d')
        self.stock_info = pd.DataFrame(columns=("Open","High","Low","Close","Volume"))


        self._create_kiwoom_instance()
        self._set_signal_slots()
        self._comm_connect()

# COM을 사용하기 위한 메서드
    def _create_kiwoom_instance(self):
        self.setControl("KHOPENAPI.KHOpenAPICtrl.1")

    def _set_signal_slots(self):
        # 로그인할 시 OnEventConnect 이벤트 발생
        self.OnEventConnect.connect(self._event_connect)

        # tr후 이벤트 발생
        self.OnReceiveTrData.connect(self._receive_tr_data)

    # 로그인 메서드, 로그인 과정에서 프로그램이 진행되면 안 되기 때문에
    # 이벤트 루프 생성
    def _comm_connect(self):
        self.dynamicCall("CommConnect()")
        self.login_event_loop = QEventLoop()
        self.login_event_loop.exec_()

    # 로그인 성공 여부 메서드
    def _event_connect(self, err_code):
        if err_code == 0:
            print("connected")
        else:
            print("disconnected")
        self.login_event_loop.exit()

    # tr을 서버에 전송한다
    def comm_rq_data(self, rqname, trcode, next, screen_no):
        self.dynamicCall("CommRqData(QString, QString, int, QString)", rqname, trcode, next, screen_no)
        self.tr_event_loop = QEventLoop()
        self.tr_event_loop.exec_()

    # 서버한테 받은 데이터를 반환한다.
    def _comm_get_data(self, code, real_type, field_name, index, item_name):
        ret = self.dynamicCall("CommGetData(QString, QString, QString, int, QString)", code,
                               real_type, field_name, index, item_name)
        return ret.strip()

    # 서버한테 받은 데이터의 갯수를 반환한다.
    def _get_repeat_cnt(self, trcode, rqname):
        ret = self.dynamicCall("GetRepeatCnt(QString, QString)", trcode, rqname)
        return ret

    # 종목 이름 반환. 반환 값이 ""이면 code에 해당하는 종목 없음
    def is_stock(self, code):
        ret = self.dynamicCall("GetMasterCodeName(QString)", [code])
        return ret

    # tr 입력값을 서버 통신 전에 입력
    # ex. SetInputValue("종목코드","000660")
    def set_input_value(self, id, value):
        self.dynamicCall("SetInputValue(QString,QString)", id, value)

    def _receive_tr_data(self, screen_no, rqname, trcode, record_name, next, unused1, unused2, unused3, unused4):
        if next == '2':
            self.remained_data = True
        else:
            self.remained_data = False

        if rqname == "opt10081_req":
            self._opt10081_20006(rqname, trcode)
        elif rqname == "opt20006_req":
            self._opt10081_20006(rqname, trcode)

        try:
            self.tr_event_loop.exit()
        except AttributeError:
            pass


    # 종목의 일자, 시가, 종가 데이터를 요청
    def req_stock_daily_value(self, code, day):
        self.stock_info = pd.DataFrame(columns=("Open", "High", "Low", "Close","Volume"))

        print("종목 일봉 데이터 요청")
        self.set_input_value("종목코드", code)
        self.set_input_value("기준일자", self.day)
        self.set_input_value("수정주가구분", "1")
        self.comm_rq_data("opt10081_req", "opt10081", 0, "2000")

        if day is not None:
            day = day.strftime('%Y%m%d')
            temp_data = self.stock_info[self.stock_info.index.values <= day]
            if temp_data.empty is False:
                self.stock_info = self.stock_info[self.stock_info.index.values>day]
                self.remained_data = False


        while self.remained_data:
            print("종목 일봉 데이터 추가 요청")
            time.sleep(0.2)
            self.set_input_value("종목코드", code)
            self.set_input_value("기준일자", self.day)
            self.set_input_value("수정주가구분", "1")
            self.comm_rq_data("opt10081_req", "opt10081", 2, "2000")
            if day is not None:
                temp_data = self.stock_info[self.stock_info.index.values <= day]
                if temp_data.empty is False:
                    self.stock_info = self.stock_info[self.stock_info.index.values > day]
                    break

        self.stock_info.index.name = "Date"
        return self.stock_info


    # 종목/지수 일자, 시가,저가,고가, 종가 데이터를 서버에서 가져오고 stock_info 에 저장
    def _opt10081_20006(self,rqname,trcode):
        data_cnt = self._get_repeat_cnt(trcode, rqname)
        for i in range(data_cnt):
            date = self._comm_get_data(trcode, "", rqname, i, "일자")
            open = self._comm_get_data(trcode, "", rqname, i, "시가")
            low = self._comm_get_data(trcode, "", rqname, i, "저가")
            High = self._comm_get_data(trcode, "", rqname, i, "고가")
            close = self._comm_get_data(trcode, "", rqname, i, "현재가")
            volume = self._comm_get_data(trcode, "", rqname, i, "거래량")
            self.stock_info = self.stock_info.append(pd.DataFrame({'Open':open, 'Low':low, 'High':High,'Close':close, 'Volume':volume}, index=[date]))


    # 코스피, 코스닥의 일자, 시가, 종가 데이터를 요청
    def req_index_daily_value(self, code, day):
        self.stock_info = pd.DataFrame(columns=("Open", "High", "Low", "Close", "Volume"))
        print("업종 일봉 데이터 요청")
        self.set_input_value("업종코드", code)
        self.set_input_value("기준일자", self.day)
        self.set_input_value("수정주가구분", "1")
        self.comm_rq_data("opt20006_req", "opt20006", 0, "1999")

        if day is not None:
            day = day.strftime('%Y%m%d')
            temp_data = self.stock_info[self.stock_info.index.values <= day]
            if temp_data.empty is False:
                self.stock_info = self.stock_info[self.stock_info.index.values>day]
                self.remained_data = False

        while self.remained_data:
            print("업종 일봉 데이터 추가 요청")
            time.sleep(0.2)
            self.set_input_value("업종코드", code)
            self.set_input_value("기준일자", self.day)
            self.set_input_value("수정주가구분", "1")
            self.comm_rq_data("opt20006_req", "opt20006", 2, "1999")

            if day is not None:
                temp_data = self.stock_info[self.stock_info.index.values <= day]
                if temp_data.empty is False:
                    self.stock_info = self.stock_info[self.stock_info.index.values > day]
                    break

        self.stock_info.index.name = "Date"
        return self.stock_info