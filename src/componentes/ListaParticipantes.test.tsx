import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import ListaParticipantes from "./ListaParticipantes";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";

jest.mock('../state/hook/useListaParticipantes', () => {
    return{
        useListaParticipantes: jest.fn()
    }
})
describe('uma lista vazia de participantes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([])
    })
   test('renderizando a lista vazia', () => {
    render(<RecoilRoot>
        <ListaParticipantes/>
    </RecoilRoot>)

    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(0)
   })
})

describe('uma lista preenchida de participantes', () => {
    const mockParticipantes = ['Ana','Catarina']
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(mockParticipantes)
    })
    test('renderizando a lista de participantes', () => {
     render(<RecoilRoot>
         <ListaParticipantes/>
     </RecoilRoot>)
 
     const itens = screen.queryAllByRole('listitem')
     expect(itens).toHaveLength(mockParticipantes.length)
    })
 })