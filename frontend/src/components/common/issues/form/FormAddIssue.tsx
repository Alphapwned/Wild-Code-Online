import { useForm, SubmitHandler } from "react-hook-form"
import { NEW_ISSUE_MUTATION } from "graphql/mutations/NEW_ISSUE_MUTATION"
import { useMutation } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useParams } from "react-router-dom"
import { INewIssueProps } from "utils/interface/INewIssue"
import { faCircleDot } from "@fortawesome/free-regular-svg-icons"

type refetch = {
  refecthIssues: () => void
}

const AddNewIssue = (refecthIssues: refetch) => {
  const [addIssue, { loading }] = useMutation(NEW_ISSUE_MUTATION)
  const { id } = useParams()
  const fileId = id ? parseInt(id) : null
  const { register, handleSubmit } = useForm<INewIssueProps>({
    mode: "onBlur"
  })
  const onSubmit: SubmitHandler<INewIssueProps> = async (data) => {
    if (data.issue) {
      try {
        await addIssue({
          variables: {
            input: {
              issue: data.issue,
              status: "Open",
              fileId
            }
          }
        })
        const textarea = document.getElementById("issue") as HTMLTextAreaElement
        textarea.value = ""
        refecthIssues.refecthIssues()
      } catch (error: any) {
        console.log(error)
      }
    }
  }

  return (
    <div className="comment-form">
      <h4>Signaler une issue</h4>
      <div className="container-comment-form">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            id="issue"
            placeholder="Expliquez quel est le bug ..."
            rows={5}
            {...register("issue")}
          ></textarea>

          <div className="button-container-form ">
            <button className="button-form" disabled={loading}>
              <FontAwesomeIcon
                className="message-icon"
                icon={faCircleDot}
                flip="horizontal"
                size="sm"
              />
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewIssue
