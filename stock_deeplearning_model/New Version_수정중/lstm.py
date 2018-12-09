'''
This script shows how to predict stock prices using a basic RNN
'''
import tensorflow as tf
import numpy as np
import matplotlib
import os
import csv
import glob
import sys
import codecs
import sendStockData

tf.set_random_seed(777)  # reproducibility

if "DISPLAY" not in os.environ:
    # remove Travis CI Error
    matplotlib.use('Agg')

import matplotlib.pyplot as plt

#정규화
def MinMaxScaler(data):
    numerator = data - np.min(data, 0)
    denominator = np.max(data, 0) - np.min(data, 0)
    return numerator / (denominator + 1e-7)
#역정규화
def reverse_MinMaxScaler(org_data, data):
    denominator = np.max(org_data, 0) - np.min(org_data, 0)
    
    return (data * (denominator + 1e-7)) + np.min(org_data, 0)

# 시퀀스 순서로 데이터 정렬
def build_dataset(time_series, seq_length):
    dataX = []
    dataY = []
    for i in range(0, len(time_series) - seq_length):
        _x = time_series[i:i + seq_length, :]
        _y = time_series[i + seq_length, [-1]]  # Next close price
        print(_x, "->", _y)
        dataX.append(_x)
        dataY.append(_y)
    return np.array(dataX), np.array(dataY)

def learngning_start():
    count = 0
    profit=[]
    all=[]
    #여러 기업 테스트 반복문으로
    for input_file in glob.glob(os.path.join('/home/syl/tensor_stock_test/stockData3','data_*')):
        file_name = os.path.basename(input_file) #csv파일 이름 받아오기

        # train Parameters
        seq_length = 7
        data_dim = 5
        hidden_dim = 10
        output_dim = 1
        learning_rate = 0.01
        #iterations = 1000
        iterations = 10

        # csv파일 값 읽어오기
        xy = np.loadtxt(file_name, delimiter=',')
        xy = xy[::-1]  #시간순서로 받아오기

        # 훈련 값과 테스트 값 비율 정해주기
        train_size = int(len(xy) * 0.7)
        train_set = xy[0:train_size]
        test_set = xy[train_size - seq_length:]

        # 값 정규화
        train_set = MinMaxScaler(train_set)
        test_set = MinMaxScaler(test_set)


        trainX, trainY = build_dataset(train_set, seq_length)
        testX, testY = build_dataset(test_set, seq_length)

        # input place holders
        X = tf.placeholder(tf.float32, [None, seq_length, data_dim])
        Y = tf.placeholder(tf.float32, [None, 1])

        # LSTM 구조 만들기
        cell = tf.nn.rnn_cell.LSTMCell(num_units=hidden_dim, state_is_tuple=True, activation=tf.tanh)
        outputs, _states = tf.nn.dynamic_rnn(cell, X, dtype=tf.float32)
        Y_pred = tf.contrib.layers.fully_connected(outputs[:, -1], output_dim, activation_fn=None)  # We use the last cell's output

        # 로스율 계산
        loss = tf.reduce_sum(tf.square(Y_pred - Y))  

        # 최적화 과정
        optimizer = tf.train.AdamOptimizer(learning_rate)
        train = optimizer.minimize(loss)

        # RMSE
        targets = tf.placeholder(tf.float32, [None, 1])
        predictions = tf.placeholder(tf.float32, [None, 1])
        rmse = tf.sqrt(tf.reduce_mean(tf.square(targets - predictions)))

        with tf.Session() as sess:
            init = tf.global_variables_initializer()
            sess.run(init)

            # 딥러닝 돌리기
            for i in range(iterations):
                _, step_loss = sess.run([train, loss], feed_dict={X: trainX, Y: trainY})
                print("[step: {}] loss: {}".format(i, step_loss))

            # 다음날 종가 예측 값 저장
            test_predict = sess.run(Y_pred, feed_dict={X: testX})
            rmse_val = sess.run(rmse, feed_dict={targets: testY, predictions: test_predict})
            print("RMSE: {}".format(rmse_val))

            print(file_name)

            ## 실제 값과 예측값 그래프 그려주기
            #plt.plot(testY)
            #plt.plot(test_predict)
            #plt.title(file_name)
            #plt.xlabel("Time Period")
            #plt.ylabel("Stock Price")
            #plt.show()

        #역정규화
        predict_price = reverse_MinMaxScaler(xy,test_predict[-1])
        present_price = reverse_MinMaxScaler(xy,testY[-1])

        #회사이름 파싱
        company = str(file_name).strip('data_')
        company = company.strip('.csv')

        present = testY[-1]
        predict = test_predict[-1]

        #상한가 종목 정보 1
        if predict > present:
            profit.append([company, present_price[-1], predict_price[-1], 1])
        #하한가 종목 정보 0
        else:
            profit.append([company, present_price[-1], predict_price[-1], 0])

        #데이터 뽑기
        text = 'output_'+company+'.txt'
        content = "현재 정규화값: " + str(present)
        content += "예측 정규화 값: " + str(predict)
        content += "현재 본래값: " + str(present_price[-1])
        content += "예측 본래값: " + str(predict_price[-1])
        result = open(text,'w')
        result.write(content)
        result.close()

        tf.reset_default_graph()
        count += 1

    print(profit[0:length])
    return profit
    