/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES } from "../constants/routes"
import { localStorageMock } from "../__mocks__/localStorage.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({pathname})
      }

      const newBill = new NewBill({document, onNavigate, store})
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      const fileInput = screen.getByTestId('file')
      const inputData = {
        name: 'jane-roe.jpg',
        _lastModified: 1580400631732,
        get lastModified() {
          return this._lastModified
        },
        set lastModified(value) {
          this._lastModified = value
        },
        size: 703786,
        type: 'image/jpeg'
      }
      const file = screen.getByTestId("file")
      fileInput.addEventListener("change", handleChangeFile)
      fireEvent.change(file, { target: { files: [inputData] } })

      expect(handleChangeFile).toHaveBeenCalled()
      expect(store.storage.put).toHaveBeenCalled()
    })
  })
   // POST new bill
   describe("When I post a new bill", () => {
    test('I should have a valid date', () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const datepicker = screen.getByTestId('datepicker')
      expect(datepicker).not.toBeNull()
      expect(datepicker.getAttributeNames().find(e => e == 'required')).not.toBeUndefined()
    })

    // test amount
    test('I should have a number as amount', () => {
      const html = NewBillUI()
      document.body.innerHTML = html 
      const amount = screen.getByTestId('amount')
      expect(amount).not.toBeNull()
      expect(amount.getAttributeNames().find(e => e == 'required')).not.toBeUndefined()
    })

    // test VAT (pourcent)
    test('I should have a number as VAT', () => {
      const ptc = screen.getByTestId('pct')
      expect(pct).not.toBeNull()
      expect(ptc.getAttributeNames().find(e => e == 'required')).not.toBeUndefined()
    })

    // test valid file
    test('I should have a valid file', () => {
      const file = screen.getByTestId('file')
      expect(file).not.toBeNull()
      expect(file.getAttributeNames().find(e => e == 'required')).not.toBeUndefined()
    })

  })

})


 