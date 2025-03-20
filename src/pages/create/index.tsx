import { useRouter } from "next/router";
import { useState } from "react"

export default function CreatePage() {
	const router = useRouter();
	const [values, setValues] = useState({
		title: "",
		author: "",
		content: ""
	});

	const [errors, setErrors] = useState({
		title: "",
		author: "",
		content: ""
	});

	const validateForm = () => {
		let isValid = true;

		const newErrors = {
			title: "",
			author: "",
			content: "",
		}

		if (!values.title.trim()) {
			newErrors.title = "제목을 입력해주세요.";
			isValid = false;
		}

		if (!values.author.trim()) {
			newErrors.author = "작성자를 입력해주세요";
			isValid = false;
		}

		if (!values.content.trim()) {
			newErrors.content = "내용을 입력해주세요";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateForm()) return;

		const response = await fetch("http://localhost:4000/posts", {
			method: "POST",
			body: JSON.stringify(values),
			headers: {
				"Content-Type": "application/json"
			}
		})
		if (response.ok) {
			router.push("/")
		} else {
			alert("게시글 작성에 실패했습니다.")
		}
	}

	return (
		<div className="flex flex-col h-screen items-center justify-center">
			<h1 className="text-2xl font-bold">게시글 작성</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div className="flex gap-2 w-full">
					<label
						className="font-bold"
						htmlFor="title">제목:
					</label>
					<input
						className={`border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-md flex-1`}
						type="text"
						id="title"
						name="title"
						value={values.title}
						onChange={handleChange}
						placeholder="제목을 입력해주세요."
					/>
					{errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
				</div>
				<div className="flex gap-2">
					<label
						className="font-bold"
						htmlFor="author">작성자:
					</label>
					<input
						className={`border ${errors.author ? "border-red-500" : "border-gray-300"} rounded-md flex-1`}
						type="text"
						id="author"
						name="author"
						value={values.author}
						onChange={handleChange}
						placeholder="작성자를 입력해주세요."
					/>
					{errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
				</div>
				<div className="flex flex-start gap-2">
					<label
						className="font-bold"
						htmlFor="content">내용:
					</label>
					<textarea
						className={`border ${errors.content ? "border-red-500" : "border-gray-300"} rounded-md flex-1`}
						id="content"
						name="content"
						value={values.content}
						onChange={handleChange}
						placeholder="내용을 입력해주세요."
					/>
					{errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
				</div>
				<button className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">제출</button>
			</form>
		</div>

	)
}