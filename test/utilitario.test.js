const Utilitarios = require('../src/utilitarios');

describe('Testes da classe Utilitarios', () => {
  const util = new Utilitarios();

  test('inverterString', () => {
    expect(util.inverterString('abc')).toBe('cba');
  });

  test('contarCaracteres', () => {
    expect(util.contarCaracteres('abc')).toBe(3);
  });

  test('paraMaiusculas', () => {
    expect(util.paraMaiusculas('abc')).toBe('ABC');
  });

  test('paraMinusculas', () => {
    expect(util.paraMinusculas('ABC')).toBe('abc');
  });

  test('primeiraLetraMaiuscula', () => {
    expect(util.primeiraLetraMaiuscula('teste')).toBe('Teste');
  });

  test('somar', () => {
    expect(util.somar(2, 3)).toBe(5);
  });

  test('subtrair', () => {
    expect(util.subtrair(5, 3)).toBe(2);
  });

  test('multiplicar', () => {
    expect(util.multiplicar(2, 3)).toBe(6);
  });

  test('dividir', () => {
    expect(util.dividir(6, 2)).toBe(3);
  });

  test('dividir por zero deve lançar erro', () => {
    expect(() => util.dividir(5, 0)).toThrow('Divisão por zero');
  });

  test('ehPar', () => {
    expect(util.ehPar(4)).toBe(true);
    expect(util.ehPar(3)).toBe(false);
  });
});