const ContaBancaria = require('../src/contaBancaria');

describe('ContaBancaria', () => {
  let conta;
  let contaBancaria;

  beforeEach(() => {
    conta = {
      id: 1,
      titular: "João",
      saldo: 100,
      limite: 50,
      status: "ativa"
    };

    contaBancaria = new ContaBancaria(conta);
  });

  test('deve obter saldo corretamente', () => {
    expect(contaBancaria.obterSaldo()).toBe(100);
  });

  test('deve depositar valor válido', () => {
    const resultado = contaBancaria.depositar(50);

    expect(resultado).toBe(true);
    expect(contaBancaria.obterSaldo()).toBe(150);
  });

  test('não deve depositar valor inválido', () => {
    const resultado = contaBancaria.depositar(0);

    expect(resultado).toBe(false);
  });

  test('deve sacar valor dentro do limite', () => {
    const resultado = contaBancaria.sacar(120);

    expect(resultado).toBe(true);
    expect(contaBancaria.obterSaldo()).toBe(-20);
  });

  test('não deve sacar valor acima do disponível', () => {
    const resultado = contaBancaria.sacar(200);

    expect(resultado).toBe(false);
  });

  test('deve alterar titular', () => {
    const resultado = contaBancaria.alterarTitular("Maria");

    expect(resultado).toBe(true);
    expect(contaBancaria.obterTitular()).toBe("Maria");
  });

  test('deve bloquear conta', () => {
    const resultado = contaBancaria.bloquearConta();

    expect(resultado).toBe(true);
    expect(contaBancaria.obterStatus()).toBe("bloqueada");
  });

  test('deve ativar conta', () => {
    conta.status = "bloqueada";

    const resultado = contaBancaria.ativarConta();

    expect(resultado).toBe(true);
    expect(contaBancaria.obterStatus()).toBe("ativa");
  });

  test('não deve encerrar conta com saldo diferente de zero', () => {
    const resultado = contaBancaria.encerrarConta();

    expect(resultado).toBe(false);
  });

  test('deve encerrar conta com saldo zero', () => {
    conta.saldo = 0;

    const resultado = contaBancaria.encerrarConta();

    expect(resultado).toBe(true);
    expect(conta.status).toBe("encerrada");
  });

  test('deve validar conta válida', () => {
    expect(contaBancaria.validarConta()).toBe(true);
  });

  test('deve falhar validação com dados inválidos', () => {
    conta.id = null;

    expect(contaBancaria.validarConta()).toBe(false);
  });

  test('deve transferir valor entre contas', () => {
    const contaDestino = new ContaBancaria({
      id: 2,
      titular: "Maria",
      saldo: 0,
      limite: 0,
      status: "ativa"
    });

    const resultado = contaBancaria.transferir(50, contaDestino);

    expect(resultado).toBe(true);
    expect(contaBancaria.obterSaldo()).toBe(50);
    expect(contaDestino.obterSaldo()).toBe(50);
  });

  test('deve calcular saldo disponível', () => {
    expect(contaBancaria.calcularSaldoDisponivel()).toBe(150);
  });

  test('deve resetar conta', () => {
    contaBancaria.resetarConta();

    expect(conta.saldo).toBe(0);
    expect(conta.limite).toBe(0);
    expect(conta.status).toBe("ativa");
  });
});