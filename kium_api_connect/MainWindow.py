import sys
from PyQt5.QtWidgets import *
from PyQt5 import uic
import MainFunctions as mf

form_class = uic.loadUiType("stock_regist.ui")[0]

class MainWindow(QMainWindow, form_class):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.setFixedSize(355,400)
        self.loginBtn.clicked.connect(self.loginBtn_clicked)
        self.excelBtn.clicked.connect(self.excelBtn_clicked)

        self.mainFucntions = mf.MainFunctions()

    def loginBtn_clicked(self):
        pwd = self.pwdEdit.toPlainText()
        if pwd == "":
            QMessageBox.about(self, "로그인 실패", "패스워드를 입력하세요")
            self.listWidget.addItem(QListWidgetItem("패스워드를 입력하세요"))
            return
        if self.mainFucntions.db_login(pwd):
            QMessageBox.about(self, "로그인 성공", "로그인 성공")
            self.pwdEdit.setEnabled(False)
            self.loginBtn.setEnabled(False)
            self.dbBtn.setEnabled(True)
            self.listWidget.addItem(QListWidgetItem("로그인 성공"))
        else:
            QMessageBox.about(self, "로그인 실패", "패스워드를 다시 입력하세요")
            self.listWidget.addItem(QListWidgetItem("비밀번호가 틀렸습니다. 다시 입력하세요"))

    def excelBtn_clicked(self):
        code = self.codeEdit.toPlainText()
        if code == '':
            QMessageBox.about(self, "실패", "종목 코드를 입력하세요")
            self.listWidget.addItem(QListWidgetItem("종목 코드를 입력하세요"))
            return
        if self.mainFucntions.is_stock(code):
            QMessageBox.about(self, "입력 시작", "종목 데이터 전송 시작을 시작하겠습니다.. OK를 눌러주세요")
            self.mainFucntions.data_to_excel(code)
            QMessageBox.about(self, "입력 성공", "종목 데이터 엑셀 파일을 다운로드했습니다.")
            self.listWidget.addItem(QListWidgetItem("종목 데이터 전송 성공. 엑셀에 데이터가 저장되었습니다."))
            self.listWidget.addItem(QListWidgetItem("이 프로그램 설치 위치에 엑셀 파일이 있습니다."))
        else:
            QMessageBox.about(self, "실패", "종목 코드를 다시 입력하세요")
            self.listWidget.addItem(QListWidgetItem("종목 코드를 다시 입력하세요. 코드에 해당하는 종목이 없습니다."))


if __name__ == "__main__":
    app = QApplication(sys.argv)
    mainWindow = MainWindow()
    mainWindow.show()
    app.exec_()