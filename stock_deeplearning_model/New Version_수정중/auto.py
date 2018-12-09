import csv
import os
import glob
import lstm
import sendStockData

count = 0
def run():
    for i in range(0, 29):
        profit = []
        
        #lstm 딥러닝 시작
        profit = lstm.learngning_start()
        length = len(profit)
        
        #데이터 csv파일에 업데이트
        for input_file in glob.glob(os.path.join('/home/syl/tensor_stock_test/stockData3','data_*')):
            with open(input_file, 'r', newline='') as csv_file:
                filewriter = csv.writer(csv_file, delimiter=',')
                for i in range(0, length):
                    filewriter.writerow(profit[i][2])    
                
        if(count == 1):
            #예측종가 내보내기
            for i in range(0, length):
                sendStockData.insert(profit[i][0], profit[i][1], profit[i][2], profit[i][3])

        if(count == 29):
            #예측종가 내보내기
            for i in range(0, length):
                sendStockData.insert(profit[i][0], profit[i][1], profit[i][2], profit[i][3])

#if(오후 3시 되면)
    run()