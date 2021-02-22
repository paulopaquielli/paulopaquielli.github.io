import { generateCPF, generateCNPJ, formatCPF, formatCNPJ } from '@brazilian-utils/brazilian-utils'
import { name, internet, phone, finance, vehicle, random } from 'faker/locale/pt_BR'

const fullName = `${name.firstName()} ${name.lastName()}`
const email = internet.email()
const mobilePhone = phone.phoneNumber('11 #####-####')
const cpf = formatCPF(generateCPF())


const cnpj = formatCNPJ(generateCNPJ())
const bankAccount = finance.account()
const bankAgency = finance.mask()
const licensePlate = vehicle.vrm('###-0000')


const inputs = {
  name: fullName,
  email: email,
  phone: mobilePhone,
  cpf: cpf,
  cnpj: cnpj,
  account: bankAccount,
  agency: bankAgency,
  license: licensePlate,
}

const fillInputs = inputs => Object.entries(inputs).forEach(([id, value]) => {
  const el = document.getElementById(id)
  el.value = value
})

fillInputs(inputs)
