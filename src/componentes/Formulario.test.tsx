import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

describe("o comportamento do formulário.tsx", () => {
  test("quando o input estiver vazio, novos participantes não podem ser adicionados", () => {
    // Renderizar o formulário
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // Encontrar na DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // Encontrar na DOM o botão
    const botao = screen.getByRole("button");

    // Garantir que o input esteja no documento
    expect(input).toBeInTheDocument();

    // Garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  });

  test("adicionar um participante caso exista um nome preenchido", () => {
    // Renderizar o formulário
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // Encontrar na DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // Encontrar na DOM o botão
    const botao = screen.getByRole("button");

    // Inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    // Clicar no botão de submeter
    fireEvent.click(botao);

    // Garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();

    // Garantir que o input não tenha um valor
    expect(input).toHaveValue("");
  });

  test("nomes duplicados não podem ser adicionados na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });

  test("mensagem de erro deve sumir após os timers", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    fireEvent.click(botao);
    let mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
});
