/**
 * @jest-environment jsdom
 */

 import { fireEvent, screen, waitFor } from "@testing-library/dom"
 import NewBillUI from "../views/NewBillUI.js"
 import NewBill from "../containers/NewBill.js"
 import { ROUTES, ROUTES_PATH } from "../constants/routes"
 import { localStorageMock } from "../__mocks__/localStorage.js";
 import userEvent from "@testing-library/user-event";
 import mockStore from "../__mocks__/store.js";
 import { bills } from "../fixtures/bills";
 import router from "../app/Router.js";
 import BillsUI from "../views/BillsUI.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then mail icon in vertical layout should be highlighted", async() => {

       Object.defineProperty(window, 'localStorage', { value: localStorageMock })
       window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee'
       }))

       const root = document.createElement("div")
       root.setAttribute("id", "root")
       document.body.append(root)
       router()
       window.onNavigate(ROUTES_PATH.NewBill)
       await waitFor(() => screen.getByTestId('icon-mail'))
       const windowIcon = screen.getByTestId('icon-mail')
       const iconActivated = windowIcon.classList.contains('active-icon')
       expect(iconActivated).toBeTruthy() // Vérifiez si la valeur, lorsqu'elle est convertie en booléen, sera une valeur véridique
    })
 })

  //ON NEWBILL PAGE, THE FORM SHOULD BE LOADED
  describe("When I am on NewBill Page", () => {
    test("Then the new bill's form should be loaded with its fields", () => {
        const html = NewBillUI()
        document.body.innerHTML = html
        expect(screen.getByTestId("form-new-bill")).toBeTruthy(); 
        expect(screen.getByTestId("expense-type")).toBeTruthy();
        expect(screen.getByTestId("expense-name")).toBeTruthy();
        expect(screen.getByTestId("datepicker")).toBeTruthy();
        expect(screen.getByTestId("amount")).toBeTruthy();
        expect(screen.getByTestId("vat")).toBeTruthy();
        expect(screen.getByTestId("pct")).toBeTruthy();
        expect(screen.getByTestId("commentary")).toBeTruthy();
        expect(screen.getByTestId("file")).toBeTruthy();
        expect(screen.getByRole("button")).toBeTruthy();
    })

    
    test('Then I can select upload an image file', () => {   
       window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
       const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname })
       }
       const html = NewBillUI()
       document.body.innerHTML = html
       const newBill = new NewBill({
          document,
          onNavigate,
          store: null,
          localStorage: window.localStorage,
       })
      
       const handleChangeFile = jest.fn((e) => newBill.handleChangeFile(e))
       const selectFile = screen.getByTestId('file')
       const testFile = new File(['AcceptedFile'], 'acceptedFile.jpg', {
          type: 'image/jpeg',
       })
 
       selectFile.addEventListener('change', handleChangeFile)
       fireEvent.change(selectFile, { target: { files: [testFile] } })
 
       expect(handleChangeFile).toHaveBeenCalled()
       expect(selectFile.files[0]).toStrictEqual(testFile)
    })
  })

  //  // POST NEW BILL
  //  describe("When I post a new bill", () => {
  //   test('I should have a valid date', () => {
  //     const html = NewBillUI()
  //     document.body.innerHTML = html
  //     const datepicker = screen.getByTestId('datepicker')
  //     expect(datepicker).not.toBeNull()
  //     expect(datepicker.getAttributeNames().find(e => e == 'required')).not.toBeUndefined()
  //   })

  //   // TEST AMOUNT
  //   test('I should have a number as amount', () => {
  //     const html = NewBillUI()
  //     document.body.innerHTML = html 
  //     const amount = screen.getByTestId('amount')
  //     expect(amount).not.toBeNull()
  //     expect(amount.getAttributeNames().find(e => e == 'required')).not.toBeUndefined()
  //   })

  //   // TEST VAT (pourcent)
  //   test('I should have a number as VAT', () => {
  //     const ptc = screen.getByTestId('pct')
  //     expect(pct).not.toBeNull()
  //     expect(ptc.getAttributeNames().find(e => e == 'required')).not.toBeUndefined()
  //   })

  //   // TEST VALID FILE
  //   test('I should have a valid file', () => {
  //     const file = screen.getByTestId('file')
  //     expect(file).not.toBeNull()
  //     expect(file.getAttributeNames().find(e => e == 'required')).not.toBeUndefined()
  //   })

  // })

})