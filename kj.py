from flask import Flask, request, render_template
from ipwhois import IPWhois
from datetime import datetime

app = Flask(__name__, static_folder='src', static_url_path='/static', template_folder='.')

@app.route('/')
def home():
    user_ip = request.remote_addr
    user_agent = request.headers.get('User-Agent')

    ip_info = {}
    try:
        obj = IPWhois(user_ip)
        ip_info = obj.lookup_rdap()
    except Exception as e:
        print(f"Error fetching IP info: {e}")

    print(f"Visitor IP: {user_ip}, User-Agent: {user_agent}, IP Info: {ip_info}")
    return render_template('index.html')


@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        subject = request.form.get("subject")
        message = request.form.get("message")

        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # ساختن متن برای ذخیره
        log_entry = f"""
                ---------------------------
                ⏰ {now}
                👤 Name: {name}
                📧 Email: {email}
                📌 Subject: {subject}
                📝 Message: {message}
                """

        # ذخیره در فایل
        with open("message.txt", "a", encoding="utf-8") as f:
            f.write(log_entry)

        return ("", 200)

    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)



