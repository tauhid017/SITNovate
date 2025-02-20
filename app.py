from flask import Flask, render_template, request
import os
import google.generativeai as generative_ai

app = Flask(__name__)

# Set your Gemini API key
os.environ["GOOGLE_API_KEY"] = "AIzaSyD5ARWxNMr8xWc1fG0BYtOcP0iq_acAGZ4"  # Replace with your actual API key

generative_ai.configure(api_key=os.environ["GOOGLE_API_KEY"])

@app.route("/", methods=["GET", "POST"])
def index():
    reviewed_code = None
    if request.method == "POST":
        code_to_review = request.form.get("code")

        if code_to_review:
            try:
                # Gemini API interaction
                model = generative_ai.GenerativeModel('gemini-pro')
                prompt = f"""Review the following code and provide suggestions for improvement:

                ```python
                {code_to_review}
                ```
                """

                response = model.generate_content(prompt)  # FIXED METHOD

                reviewed_code = response.text  # Get the response text

            except Exception as e:
                reviewed_code = f"Error during code review: {str(e)}"

    return render_template("index.html", reviewed_code=reviewed_code)

if __name__ == "__main__":
    app.run(debug=True)
