import os
import chainlit as cl
from dotenv import load_dotenv, find_dotenv
from agents import Agent, AsyncOpenAI, Runner, RunConfig, OpenAIChatCompletionsModel, function_tool

# Load .env variables
load_dotenv(find_dotenv())
gemini_api_key = os.getenv("GEMINI_API_KEY")

# Gemini Client setup
external_client = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash",
    openai_client=external_client
)

run_config = RunConfig(
    model=model,
    tracing_disabled=True,
)

# Optional tools (can be used if necessary)
@function_tool
def upload_blog_info():
    """Guide to upload a blog"""
    return "Click on the 'Blog' menu from navbar, then click 'Write' to open the upload form. You can upload via URL or from your device."

@function_tool
def get_help():
    """Explain how to contact the admin"""
    return "Go to the 'Contact' menu and submit the form. Your message will be emailed to the admin."

@function_tool
def give_feedback():
    """Feedback section usage"""
    return "Click the 'Feedback' button in the top menu to share your thoughts or suggestions about the website."

# Define your Codify Blog Assistant Agent
agent = Agent(
    name="Codify Assistant ✨",
    instructions="""
You are the official assistant of Codify — a full-stack blog website built in just 1 week by Hammad Hafeez, a student leader from Governor’s IT Initiative.

Respond only to what the user asks. Don’t explain unnecessary things unless asked. 
Keep answers short and relevant.

Website Highlights:
- Blog upload via navbar → Blog → Write button.
- Upload from gallery or paste image URL.
- Comments and Likes available on all blogs.
- Feedback can be submitted via 'Feedback' button.
- Contact form available in the 'Contact' section.
- Admin dashboard accessible only by contacting admin.
- Accounts and personal data are secure here.

If the user asks:
- "What tech stack is used?": reply with "Next.js 14 (App Router), TypeScript, Tailwind CSS, Sanity CMS, Clerk Auth, Stripe (for future), EmailJS, and Cloudinary for images."
- "Is this website complete?": reply with "It's fully functional and live, but more powerful features are coming soon, Inshallah!"
""",
    tools=[upload_blog_info, get_help, give_feedback]
)


# On chat start
@cl.on_chat_start
async def start():
    cl.user_session.set("history", [])
    await cl.Message(content="👋 Welcome to Codify! I'm here to help you. Ask me anything about this website.").send()

# Handle user messages
@cl.on_message
async def main(message: cl.Message):
    history = cl.user_session.get("history") or []
    history.append({"role": "user", "content": message.content})

    msg = cl.Message(content="")
    await msg.send()

    prompt = "\n".join(
        [f"{item['role'].capitalize()}: {item['content']}" for item in history]
    )

    result = Runner.run_streamed(
        agent,
        input=prompt,
        run_config=run_config,
    )

    async for event in result.stream_events():
        delta = getattr(getattr(event, "data", None), "delta", None)
        if delta:
            msg.content += delta
            await msg.update()

    history.append({"role": "assistant", "content": msg.content})
    cl.user_session.set("history", history)
