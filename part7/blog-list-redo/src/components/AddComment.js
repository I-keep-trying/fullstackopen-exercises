import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewComment } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import moment from 'moment'

const NewComment = () => {
  const dispatch = useDispatch()

  const blog = useSelector((state) => state.blog.blog)

  const comments = useSelector((state) => state.blog.blog.comments)

  const date = moment().format('dddd, MMMM Do YYYY, h:mm a')
  const newComment = (e) => {
    e.preventDefault()
    const commentObject = {
      comments: {
        comment: e.target.comment.value,
        date: date,
      },
    }
    e.target.comment.value = ''
    blogService.addComment(commentObject, blog.id).then((response) => {
      dispatch(addNewComment(response))
    })
  }

  return (
    <div className="card">
      <div className="card-container">
        <form onSubmit={newComment}>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Add Comment
              </span>
            </div>
            <textarea class="form-control" name="comment" />
          </div>

          <div className="form-group">
            <button className="btn btn-secondary" type="sumbit">
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="card-container">
        <h3>Comments:</h3>
        {comments.length === 0 ? (
          <div>No comments yet... </div>
        ) : (
          <>
            {comments.map((comment) => {
              return (
                <div key={comment._id}>
                  <div>
                    <div className="note">{comment.date} </div>
                    {comment.comment}{' '}
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default NewComment
