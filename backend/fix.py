from app import app, db, Blog

with app.app_context():
    posts = Blog.query.all()
    updated_count = 0

    for post in posts:
        if not post.user_id:
            post.user_id = 'unknown'
            updated_count += 1
        if not post.user_name:
            post.user_name = 'Anonymous'
            updated_count += 1

    db.session.commit()
    print(f"✅ Updated {updated_count} fields in old blog posts.")
