import json
import predictor
import allocate

def predict_handler(event, context):
    runcount = int(event['queryStringParameters']['rc'])
    usercount = int(event['queryStringParameters']['uc'])
    dayofyear = int(event['queryStringParameters']['doy'])
    holidaycount = int(event['queryStringParameters']['doh'])

    result = predictor.seat_count_predict(runcount, usercount, dayofyear, holidaycount)
    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }
    
def allocate_handler(event, context):
    strategy = event['queryStringParameters']['startegy']

    result = allocate.allocate_seat_for_N(strategy)
    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }

if __name__ == '__main__':
    print('this is main')

