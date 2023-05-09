export function ValidateCPF(cpf) {
    let isValid = false;
    let cleanedCpf = cpf.replaceAll(".", "").replaceAll("-", "").replaceAll("_", "").replaceAll(".", "");
    const digitoVerificador = cleanedCpf[9] + cleanedCpf[10];

    // Validação do primeiro digito
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cleanedCpf[i]) * (10 - i);
    }

    // Multiplica por 10 e divide por 11 e pega o resto
    let resto = ((soma * 10) % 11);

    // Se o resto for 10 consideramos como 0
    if (resto === 10) {
        resto = 0;
    }

    // O resto tem que ser igual o digito verificador 1, senao for o CPF é inválido
    if (resto.toString() === digitoVerificador[0]) {
        // Validação do segundo dígito
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cleanedCpf[i]) * (11 - i);
        }

        resto = ((soma * 10) % 11);

        // O resto tem que ser igual o digito verificador 2, senao for o CPF é inválido
        if (resto.toString() === digitoVerificador[1]) {
            isValid = true;
        }
    }

    return isValid;
}