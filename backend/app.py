from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import datetime

app = Flask(__name__)
CORS(app)

# SQLite DB config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)




# --------------------------------------------
# 📝 MODELS
# --------------------------------------------



# --------------------------------------------
# 📝 BLOG
# --------------------------------------------
class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    image_url = db.Column(db.String(300))
    
    # ✅ Add these two lines
    user_id = db.Column(db.String(100), nullable=True)
    user_name = db.Column(db.String(100), nullable=True)
    
    user_image = db.Column(db.String(500))  # 👈 Clerk profile image
    likes = db.relationship('Like', backref='blog', lazy=True)





# --------------------------------------------
# 📝 LIKE
# --------------------------------------------
class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    blog_id = db.Column(db.Integer, db.ForeignKey('blog.id'), nullable=False)
    user_id = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)





# --------------------------------------------
# 📝 COMMENT
# --------------------------------------------
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    blog_id = db.Column(db.Integer, db.ForeignKey('blog.id'), nullable=False)
    user_id = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    parent_id = db.Column(db.Integer, db.ForeignKey('comment.id'), nullable=True)
    replies = db.relationship('Comment', lazy=True)
    image_url = db.Column(db.String(300))  # add in Comment model
    user_name = db.Column(db.String(100))  # 🆕 Add this line


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
            "image_url": self.image_url,
            "user_name": self.user_name,
            "replies": [r.to_dict() for r in self.replies]
        }



# --------------------------------------------
# 📣 FEEDBACK
# --------------------------------------------

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=True)
    user_name = db.Column(db.String(100), nullable=True)
    image_url = db.Column(db.String(300), nullable=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user_name": self.user_name,
            "image_url": self.image_url,
            "content": self.content,
            "created_at": self.created_at.isoformat()
        }



# --------------------------------------------
# 📣 FEEDBACK ROUTES
# --------------------------------------------



@app.route('/')
def home():
    return jsonify({
        "message": "🚀 Codify Blog API is running successfully!",
        "status": "OK",
        "endpoints": [
            "/api/posts",
            "/api/comments",
            "/api/feedback",
            "/api/posts/<post_id>/like",
            "/api/posts/<post_id>/comments"
        ]
    })




@app.route('/api/feedback', methods=['GET'])
def get_feedbacks():
    feedbacks = Feedback.query.order_by(Feedback.created_at.desc()).all()
    return jsonify([f.to_dict() for f in feedbacks])


@app.route('/api/feedback', methods=['POST'])
def add_feedback():
    data = request.get_json()
    content = data.get('content')
    user_id = data.get('user_id')
    user_name = data.get('user_name', 'Anonymous')
    image_url = data.get('image_url')

    if not content:
        return jsonify({"error": "Content is required"}), 400

    feedback = Feedback(
        user_id=user_id,
        user_name=user_name,
        image_url=image_url,
        content=content
    )
    db.session.add(feedback)
    db.session.commit()

    return jsonify(feedback.to_dict()), 201



@app.route('/api/feedback/<int:id>', methods=['PUT'])
def update_feedback(id):
    data = request.get_json()
    feedback = Feedback.query.get_or_404(id)

    # Security: Allow only if same user_name
    if feedback.user_name != data.get('user_name'):
        return jsonify({"error": "Unauthorized"}), 403

    feedback.content = data.get('content', feedback.content)
    db.session.commit()

    return jsonify({"message": "Feedback updated successfully"}), 200




# --------------------------------------------
# 🧠 BLOG ROUTES
# --------------------------------------------

@app.route('/api/posts', methods=['GET'])
def get_posts():
    blogs = Blog.query.all()
    return jsonify([
        {
            "id": b.id,
            "title": b.title,
            "content": b.content,
            "image_url": b.image_url,
            "created_at": b.created_at.isoformat(),
            "user_name": b.user_name,       # ✅ i think ye rough line hy 
            "user_image": b.user_image      # ✅ i think ye rough line hy
        } for b in blogs
    ])

@app.route('/api/posts', methods=['POST'])
def add_post():
    data = request.get_json()
    new_blog = Blog(
        title=data['title'],
        content=data['content'],
        image_url=data.get('image_url'),
        user_id=data['user_id'],
        user_name=data.get('user_name', 'Anonymous'),  # 👈 fallback
        user_image=data.get('user_image'),
    )
    db.session.add(new_blog)
    db.session.commit()
    return jsonify({"message": "Blog created successfully"}), 201


@app.route('/api/posts/<int:id>', methods=['PUT'])
def update_post(id):
    blog = Blog.query.get_or_404(id)
    data = request.get_json()
    blog.title = data['title']
    blog.content = data['content']
    blog.image_url = data.get('image_url', blog.image_url)
    db.session.commit()
    return jsonify({"message": "Blog updated"})

@app.route('/api/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    return jsonify({"message": "Blog deleted"})

@app.route('/api/posts/<int:id>', methods=['GET'])
def get_single_blog(id):
    blog = Blog.query.get(id)
    if blog is None:
        return jsonify({"error": "Blog not found"}), 404
    return jsonify({
    "id": blog.id,
    "title": blog.title,
    "content": blog.content,
    "image_url": blog.image_url,
    "created_at": blog.created_at.isoformat(),
    "user_name": blog.user_name,       # ✅ Add this
    "user_image": blog.user_image      # ✅ Add this
})








# --------------------------------------------
# ❤️ LIKE ROUTES
# --------------------------------------------

@app.route('/api/posts/<int:post_id>/like', methods=['POST'])
def toggle_like(post_id):
    data = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    blog = Blog.query.get_or_404(post_id)
    existing_like = Like.query.filter_by(blog_id=post_id, user_id=user_id).first()

    if existing_like:
        db.session.delete(existing_like)
        db.session.commit()
        return jsonify({'liked': False})
    else:
        new_like = Like(blog_id=post_id, user_id=user_id)
        db.session.add(new_like)
        db.session.commit()
        return jsonify({'liked': True})


@app.route('/api/posts/<int:id>/is-liked', methods=['GET'])
def is_liked(id):
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    liked = Like.query.filter_by(blog_id=id, user_id=user_id).first()
    return jsonify({"liked": bool(liked)})

@app.route('/api/posts/<int:id>/likes-count', methods=['GET'])
def likes_count(id):
    count = Like.query.filter_by(blog_id=id).count()
    return jsonify({"count": count})








# --------------------------------------------
# 💬 COMMENTS ROUTES
# --------------------------------------------

@app.route('/api/posts/<int:post_id>/comments', methods=['GET'])
def get_comments(post_id):
    comments = Comment.query.filter_by(blog_id=post_id, parent_id=None).all()
    return jsonify([c.to_dict() for c in comments])

@app.route('/api/posts/<int:post_id>/comments', methods=['POST'])
def add_comment(post_id):
    data = request.get_json()
    content = data.get('content')
    user_id = data.get('user_id')
    parent_id = data.get('parent_id')
    image_url = data.get('image_url')  # 👈 get profile image from request
    user_name = data.get('user_name')  # 🆕
    


    if not user_id or not content:
        return jsonify({"error": "Missing user_id or content"}), 400

    comment = Comment(
        blog_id=post_id,
        user_id=user_id,
        content=content,
        parent_id=parent_id,
        image_url=image_url,  # 👈 include this
        user_name=user_name,  # 🆕
    )
    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.to_dict()), 201

@app.route('/api/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment deleted"})





#admin pannel me saare comment dekhanay wala route
# ✅ ADMIN PURPOSE: Get ALL comments
@app.route('/api/comments', methods=['GET'])
def get_all_comments():
    comments = Comment.query.all()
    return jsonify([
        {
            "id": c.id,
            "content": c.content,
            "user_name": c.user_name,
            "blog_id": c.blog_id,
            "created_at": c.created_at.isoformat()
        } for c in comments
    ])






# --------------------------------------------
# INIT
# --------------------------------------------

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)

