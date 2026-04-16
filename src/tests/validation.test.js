import { describe, expect, it } from "vitest";

import { validacionInput } from "../scripts/validation.js";

const ERROR_REGEX =
  "El mensaje solo puede tener mayusculas, minusculas, espacios, comas, puntos, interrogantes y exclamaciones.";
const ERROR_MINIMO = "El mensaje debe tener minimo 1 caracter de longitud.";
const ERROR_MAXIMO = "El mensaje debe tener maximo 500 caracteres de longitud.";

describe("validacionInput", () => {
  it("acepta un mensaje con letras y espacios", () => {
    expect(validacionInput("Jon Snow")).toEqual({
      isValid: true,
      error: null,
    });
  });

  it("acepta acentos, enies, comas y puntos", () => {
    expect(validacionInput("\u00C1lvaro N\u00FA\u00F1ez, listo.")).toEqual({
      isValid: true,
      error: null,
    });
  });

  it("acepta interrogantes y exclamaciones", () => {
    expect(validacionInput("\u00BFJon Snow?!")).toEqual({
      isValid: true,
      error: null,
    });
  });

  it("rechaza un valor numerico con el error del regex", () => {
    expect(validacionInput(123)).toEqual({
      isValid: false,
      error: ERROR_REGEX,
    });
  });

  it("rechaza booleanos con el error del regex", () => {
    expect(validacionInput(true)).toEqual({
      isValid: false,
      error: ERROR_REGEX,
    });
  });

  it("rechaza null con el error del regex", () => {
    expect(validacionInput(null)).toEqual({
      isValid: false,
      error: ERROR_REGEX,
    });
  });

  it("rechaza un mensaje vacio tras aplicar trim", () => {
    expect(validacionInput("   ")).toEqual({
      isValid: false,
      error: ERROR_MINIMO,
    });
  });

  it("acepta un mensaje de exactamente 500 caracteres", () => {
    const mensaje = "a".repeat(500);

    expect(validacionInput(mensaje)).toEqual({
      isValid: true,
      error: null,
    });
  });

  it("rechaza un mensaje de mas de 500 caracteres", () => {
    const mensaje = "a".repeat(501);

    expect(validacionInput(mensaje)).toEqual({
      isValid: false,
      error: ERROR_MAXIMO,
    });
  });

  it("rechaza strings con numeros", () => {
    expect(validacionInput("Jon123")).toEqual({
      isValid: false,
      error: ERROR_REGEX,
    });
  });

  it("rechaza strings con signos no permitidos", () => {
    expect(validacionInput("Jon Snow:")).toEqual({
      isValid: false,
      error: ERROR_REGEX,
    });
  });

  it("rechaza saltos de linea", () => {
    expect(validacionInput("Jon\nSnow")).toEqual({
      isValid: false,
      error: ERROR_REGEX,
    });
  });
});
