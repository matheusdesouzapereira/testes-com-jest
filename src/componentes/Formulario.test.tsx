import { render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";

test('quando o input estiver vazio, novos participantes não podem ser adicionados', () => {
    
    render(<Formulario />)

    // Encontrar na DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    // Encontrar na DOM o botão
    const botao = screen.getByRole('button')

    // Garantir que o input esteja no documento
    expect(input).toBeInTheDocument()

    // Garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled()
})