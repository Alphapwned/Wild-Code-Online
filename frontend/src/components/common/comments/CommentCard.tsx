import { useState } from "react"
import "styles/components/cardComment.scss"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormUpdateComment from "./form/FormUpdateComment"
import { useForm, SubmitHandler } from "react-hook-form"
import { UPDATE_COMMENT_MUTATION } from "graphql/mutations/UPDATE_COMMENT_MUTATION"
import { useMutation } from "@apollo/client"
import { INewCommentProps } from "utils/interface/INewComment"

interface ICommentData {
	index: number;
	id: number;
	comment: string;
	updatedAt: string;
	createdAt: string;
	username: string;
	refetchComments: () => void;
	currentUserName: string;
}

export const handleDate = (day: any): any => {
  day = new Date(day)
  return day.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}

const CommentCard = (commentInfo: ICommentData) => {
  const [id, setId] = useState<number>()
  const [currentComment, setCurrentComment] = useState<string>()
  const [isShow, setIsShow] = useState<boolean>(false)
  const [updateComment, { loading }] = useMutation(UPDATE_COMMENT_MUTATION)

  const handleToggleForm = (id?: number, comment?: string) => {
    setId(id)
    setCurrentComment(comment)
    setIsShow(true)
  }
  const { register, handleSubmit } = useForm<INewCommentProps>({
    mode: "onBlur"
  })
  const onSubmit: SubmitHandler<INewCommentProps> = async (data) => {
    if (data.comment) {
      try {
        await updateComment({
          variables: {
            update: {
              comment: data.comment
            },
            updateCommentsId: id
          }
        })
        setIsShow(false)
        commentInfo.refetchComments()
      } catch (error: any) {
        console.log(error)
      }
    }
  }
  return (
		<div className="card-comment">
			<div className={"comment-info"}>
				<div className="comment-header">
					<p>
						{commentInfo.username.charAt(0).toUpperCase()}
						{commentInfo.username.substring(1).toLowerCase()}
					</p>
					<p>{handleDate(commentInfo.createdAt)}</p>
				</div>
				{!isShow ? (
					<div className="edit-container">
						<p>{commentInfo.comment}</p>
						{commentInfo.currentUserName === commentInfo.username ? (
							<div className="edit-button-container">
								<button
									className="edit-button"
									onClick={() =>
										handleToggleForm(commentInfo.id, commentInfo.comment)
									}
								>
									<FontAwesomeIcon icon={faPenToSquare} size="lg" />
								</button>
							</div>
						) : null}
					</div>
				) : (
					<FormUpdateComment
						onSubmit={handleSubmit(onSubmit)}
						register={register}
						currentComment={currentComment ? currentComment : ""}
					/>
				)}
			</div>
		</div>
	);
}

export default CommentCard
