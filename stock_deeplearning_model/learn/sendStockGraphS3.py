from boto.s3.connection import S3Connection
from boto.s3.key import Key
import sys

conn = S3Connection('accesskey', 'accesssecretkey')
bucket = conn.get_bucket('stock-graph')

def percent_cb(complete, total):
    sys.stdout.write('.')
    sys.stdout.flush()

def uploadFile(filename):
    k = Key(bucket)
    k.key = '{}.png'.format(filename)

    k.set_contents_from_filename('{}.png'.format(filename), replace=True, cb=percent_cb, num_cb=10)
    # 파일 공개
    #k.set_acl('public-read')

    # 업로드 후 url 생성, 유효기간 설정
    return k.generate_url(3600 * 24 * 7)

#url = uploadFile('{}.png'.format(filename), files)
