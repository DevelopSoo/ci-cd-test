import Home from "@/pages"
import { fireEvent, render, screen } from "@testing-library/react"


describe("메인 페이지 테스트", () => {
	beforeEach(() => {
		render(<Home />)
	})
	test("메인 페이지가 렌더링되는지 테스트", () => {
		// 페이지 제목이 렌더링되는지 확인
		// screen: 렌더링된 화면
		// getByText: 태그에 작성된 텍스트를 바탕으로 요소를 찾기 
		// expect: 기대하는 결과 설정 (getByText의 결과가 기대하는 결과와 일치하는지 확인하는 함수)
		// toBeInTheDocument: 요소가 문서에 있는지 확인
		expect(screen.getByText("유닛 테스트 연습하기 2")).toBeInTheDocument();
	})

	test('수량 증가 기능 테스트', () => {
		const increaseButton = screen.getByText('+');
		const quantityDisplay = screen.getByText('0');

		// 수량 증가 테스트
		fireEvent.click(increaseButton);
		expect(quantityDisplay).toHaveTextContent('1');
	});

	test('수량 감소 기능 테스트', () => {

		const increaseButton = screen.getByText('+');
		const decreaseButton = screen.getByText('-');
		const quantityDisplay = screen.getByText('0');

		// 수량 증가 후 감소 테스트
		fireEvent.click(increaseButton);
		fireEvent.click(decreaseButton);
		expect(quantityDisplay).toHaveTextContent('0');
	});

	test('수량이 0일 때 감소 버튼 클릭 테스트', () => {

		const decreaseButton = screen.getByText('-');
		const quantityDisplay = screen.getByText('0');

		// 수량이 0일 때 감소 버튼 클릭 테스트
		fireEvent.click(decreaseButton);
		expect(quantityDisplay).toHaveTextContent('0'); // 여전히 0이어야 함
	});
})