import { faSquareCheck } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type submit = {
  onSubmit: () => void
  currentComment: string
  register: any
}

const UpdateComment = ({ currentComment, onSubmit, register }: submit) => {
  return (
    <div className="container-edit-form">
      <form action="" onSubmit={onSubmit}>
        <div className="edit-container">
          <textarea
            id="edit-comment"
            placeholder="Ecrivez votre commentaire ..."
            rows={3}
            defaultValue={currentComment ? currentComment : ""}
            {...register("comment")}
          ></textarea>
          <div className="action-button-container">
            <button className="action-button">
              <FontAwesomeIcon icon={faSquareCheck} size="xl" />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateComment
