from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__, static_folder='src', static_url_path='/static', template_folder='.')

@app.route('/')
def home():
    user_ip = request.remote_addr
    user_agent = request.headers.get('User-Agent')

    ip_info = {}
    try:
        response = requests.get(f"https://ipinfo.io/{user_ip}/json")
        if response.status_code == 200:
            ip_info = response.json()
    except Exception as e:
        print(f"Error fetching IP info: {e}")

    print(f"Visitor IP: {user_ip}, User-Agent: {user_agent}, IP Info: {ip_info}")
    return render_template('index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.get_json()
    name = data.get('name')
    message = data.get('message')
    if not name or not message:
        return jsonify({"error": "Name and message are required!"}), 400
    # Here you can handle the message (e.g., save it to a database or send an email)
    return jsonify({"success": True, "message": "Message received!"})


if __name__ == '__main__':
    app.run(debug=True)