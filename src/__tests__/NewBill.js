/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES, ROUTES_PATH } from "../constants/routes"
import { localStorageMock } from "../__mocks__/localStorage.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({pathname})
      }
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


 