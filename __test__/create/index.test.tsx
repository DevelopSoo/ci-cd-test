import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreatePage from "@/pages/create";

const mockPush = jest.fn();
jest.mock('next/router', () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}))

describe("Create 페이지", () => {

	beforeEach(() => {
		render(<CreatePage />)
	});

	// 이건 필요한지 의문 -> 첫 세팅 때 자동으로 삭제되는 걸로 알고 있음
	afterEach(() => {
		jest.clearAllMocks();
	})

	test("제목, 작성자, 내용을 입력하지 않고 제출 버튼을 클릭하면 에러메세지가 나타나야한다.", async () => {
		fireEvent.click(screen.getByText("제출"));

		expect(await screen.findByText("제목을 입력해주세요.")).toBeInTheDocument();
		expect(await screen.findByText("작성자를 입력해주세요")).toBeInTheDocument();
		expect(await screen.findByText("내용을 입력해주세요")).toBeInTheDocument();
	})

	test("제목, 작성자, 내용을 입력하고 제출 버튼을 클릭하면 폼 제출이 성공하고 홈페이지로 이동해야 한다.", async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
		});

		fireEvent.change(screen.getByPlaceholderText("제목을 입력해주세요."), { target: { value: "테스트 제목" } })
		fireEvent.change(screen.getByPlaceholderText("작성자를 입력해주세요."), { target: { value: "테스트 작성자" } })
		fireEvent.change(screen.getByPlaceholderText("내용을 입력해주세요."), { target: { value: "테스트 내용" } })
		fireEvent.click(screen.getByText("제출"));

		const options = {
			method: "POST",
			body: JSON.stringify({
				title: "테스트 제목",
				author: "테스트 작성자",
				content: "테스트 내용"
			}),
			headers: {
				"Content-Type": "application/json"
			}
		}

		const response = await global.fetch("http://localhost:4000/posts", options);
		expect(response).toEqual({ ok: true });
		expect(mockPush).toHaveBeenCalledWith("/");
	});

	test("제목, 작성자, 내용을 입력하고 제출 버튼을 클릭하면 폼 제출이 실패하면 '게시글 작성에 실패했습니다.' 라는 alert가 떠야한다.", async () => {
		const mockAlertSpy = jest.spyOn(window, "alert").mockImplementation();
		// window.alert = jest.fn();  // spy 대신 직접 mock 함수로 대체한다면

		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
		});

		fireEvent.change(screen.getByPlaceholderText("제목을 입력해주세요."), { target: { value: "테스트 제목" } })
		fireEvent.change(screen.getByPlaceholderText("작성자를 입력해주세요."), { target: { value: "테스트 작성자" } })
		fireEvent.change(screen.getByPlaceholderText("내용을 입력해주세요."), { target: { value: "테스트 내용" } })
		fireEvent.click(screen.getByText("제출"));

		const options = {
			method: "POST",
			body: JSON.stringify({
				title: "테스트 제목",
				author: "테스트 작성자",
				content: "테스트 내용"
			}),
			headers: {
				"Content-Type": "application/json"
			}
		}

		const response = await global.fetch("http://localhost:4000/posts", options);
		expect(response).toEqual({ ok: false });
		await waitFor(() => {
			expect(mockAlertSpy).toHaveBeenCalledWith("게시글 작성에 실패했습니다.");
		});
		// mock 함수를 사용한다면?
		// await waitFor(() => {
		// 	expect(window.alert).toHaveBeenCalledWith("게시글 작성에 실패했습니다.");
		// });
	})
})