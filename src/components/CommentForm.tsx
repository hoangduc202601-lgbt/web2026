'use client';

type CommentFormProps = {
  articleSlug: string;
};

export default function CommentForm({ articleSlug }: CommentFormProps) {

  return (
    <div className="p-t-40 p-b-30">
      <h4 className="f1-m-3 cl2 p-b-15" style={{ fontSize: '1.5rem' }}>
        Để lại bình luận
      </h4>
      <p className="f1-s-1 cl6 p-b-25">
        Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu <span style={{ color: 'red' }}>*</span>
      </p>

      <form>
        {/* Comment Textarea */}
        <div className="p-b-20">
          <textarea
            className="f1-s-1 cl6 plh9 s-full"
            placeholder="Bình luận..."
            rows={4}
            style={{
              width: '100%',
              border: '1px solid #e6e6e6',
              borderRadius: '3px',
              resize: 'vertical',
              padding: '10px 12px'
            }}
          ></textarea>
        </div>

        {/* Name, Email, Phone */}
        <div className="row">
          <div className="col-sm-4 p-b-20">
            <input
              className="f1-s-1 cl6 plh9 s-full"
              type="text"
              placeholder="Họ tên *"
              style={{
                width: '100%',
                border: '1px solid #e6e6e6',
                borderRadius: '3px',
                padding: '10px 12px'
              }}
            />
          </div>
          <div className="col-sm-4 p-b-20">
            <input
              className="f1-s-1 cl6 plh9 s-full"
              type="email"
              placeholder="Email *"
              style={{
                width: '100%',
                border: '1px solid #e6e6e6',
                borderRadius: '3px',
                padding: '10px 12px'
              }}
            />
          </div>
          <div className="col-sm-4 p-b-20">
            <input
              className="f1-s-1 cl6 plh9 s-full"
              type="tel"
              placeholder="Số điện thoại"
              style={{
                width: '100%',
                border: '1px solid #e6e6e6',
                borderRadius: '3px',
                padding: '10px 12px'
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="f1-s-1 cl0"
          style={{
            backgroundColor: '#17b978',
            border: 'none',
            borderRadius: '3px',
            cursor: 'default',
            padding: '15px 50px',
            fontSize: '14px'
          }}
        >
          Gửi bình luận
        </button>
      </form>
    </div>
  );
}

