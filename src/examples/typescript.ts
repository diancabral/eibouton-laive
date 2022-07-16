const teste = <Type extends {
  length: number
}>(param: Type): Type => {
  console.log(param.length);
  return param;
}

teste<string>('a');

const teste2 = <Type, Key extends keyof Type, Thing>(object: Type, key: Key) => {
  return object[key] as unknown as Thing;
}

type Teste = {
  a: number;
  b: number;
}

type TesteOptional = Partial<Teste>;

type Teste2<T> = T extends object ? string : T;

teste2<Teste, keyof Teste, Teste2<TesteOptional>>({ a: 1, b: 2 }, 'a');



/////////////////////////////////////////////////

type CadastrosPossiveis<T> = {
  [P in keyof T]?:
    T[P] extends object ? CadastrosPossiveis<T[P]> :
    T[P] extends boolean ? boolean :
    T[P] extends number ? number
  : T[P]
};

const cadastros = [
  {
    name: 'Dian Carlos',
    email: 'dian.cabral@gmail.com',
    idade: 27,
    skills: {
      typescript: true,
      javascript: true,
      react: true,
      vue: true,
      teste: {
        foo: 'bar'
      }
    }
  },
  {
    name: 'Karolaynne Siqueira',
    email: 'karol.siqueira@gmail.com',
    skills: {
      typescript: true,
      javascript: true,
      react: true,
      vue: true,
      teste: {
        foo: 'baz'
      }
    }
  },

] as const;

const novosUsuarios: CadastrosPossiveis<typeof cadastros> = [
  {
    email: 'dian.cabral@gmail.com',
    name: 'Dian Carlos',
    idade: 34,
    skills: {
      javascript: false,
      react: true,
      teste: {
        foo: 'bar'
      }
    }
  },
  {
    email: 'karol.siqueira@gmail.com',
    name: 'Karolaynne Siqueira'
  }
]

console.log(novosUsuarios);

/////////////////////////////////////////////////




type PessoasPossiveis<T> = T[keyof T][];
const pessoas = ['Dian', 'Karol', 'Chule', 'Dalva', 'Camilo'] as const;
const pessoasPossiveis: PessoasPossiveis<typeof pessoas> = ['Karol', 'Camilo', 'Chule', 'Dalva', 'Dian', 'Karol'];
console.log(pessoasPossiveis);

export {};
