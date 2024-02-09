import { useForm, SubmitHandler } from "react-hook-form"
import { NEW_REPORT_MUTATION } from "graphql/mutations/NEW_REPORT_MUTATION"
import { useMutation } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useParams } from "react-router-dom"
import { INewReportProps } from "utils/interface/INewReport"
import { faFileLines } from "@fortawesome/free-regular-svg-icons"

const AddNewReport = () => {
  const [addIssue, { loading }] = useMutation(NEW_REPORT_MUTATION)
  const { id } = useParams()
  const fileId = id ? parseInt(id) : null
  const { register, handleSubmit } = useForm<INewReportProps>({
    mode: "onBlur"
  })
  const onSubmit: SubmitHandler<INewReportProps> = async (data) => {
    if (data.comment) {
      try {
        await addIssue({
          variables: {
            input: {
              comment: data.comment,
              title: data.title,
              fileId
            }
          }
        })
        const textarea = document.getElementById(
          "report"
        ) as HTMLTextAreaElement

        const input = document.getElementById(
          "report-title"
        ) as HTMLInputElement
        textarea.value = ""
        input.value = ""
      } catch (error: any) {
        console.log(error)
      }
    }
  }

  return (
    <div className="report-form">
      <h4>Signaler ce ficher</h4>
      <div className="container-comment-form">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="report-title"> Title</label>
          <input
            id="report-title"
            placeholder="Entrez un titre ..."
            {...register("title")}
          />
          <textarea
            id="report"
            placeholder="Expliquez en quoi ce fichier est inapproprié ..."
            rows={5}
            {...register("comment")}
          ></textarea>

          <div className="button-container-form ">
            <button className="button-form" disabled={loading}>
              <FontAwesomeIcon
                className="message-icon"
                icon={faFileLines}
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

export default AddNewReport
