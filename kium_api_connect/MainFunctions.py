import Kiwoom as kw
from datetime import date, timedelta


class MainFunctions():
    def __init__(self):
        self.ki = kw.Kiwoom()
        
        self.date = date.today() - timedelta(1)
    def is_stock(self,code):
        if code == 'kospi' or code == 'kosdaq' or  self.ki.is_stock(code) is not "":
            return True
        else:
            return False

    def db_insert_stock(self, code):
        table_name = ""
        if code == 'kospi':
            table_name = code
            code = '001'

        elif code == 'kosdaq':
            table_name = code
            code = '101'

        else:
            table_name= 'a'+code

        #  일봉 데이터 획득
        if code == '001' or code == '101':
            data = self.ki.req_index_daily_value(code, self.date)
        else:
            data = self.ki.req_stock_daily_value(code, self.date)

    def data_to_excel(self,code):
        if code == 'kospi':
            # 코스피 일봉 데이터 획득
            data = self.ki.req_index_daily_value('001', None)
            data.to_excel('./kospi.xlsx')
        elif code == 'kosdaq':
            # 코스닥 일봉 데이터 획득
            data = self.ki.req_index_daily_value('101', None)
            data.to_excel('./kosdaq.xlsx')
        else:
            # 종목 일봉 데이터 획득
            data = self.ki.req_stock_daily_value(code, None)
            data.to_excel('./a'+code+'.xlsx')
