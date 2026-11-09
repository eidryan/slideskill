# Instalação e uso

Esta versão entrega a **skill completa no diretório raiz do repositório**. Não copie apenas SKILL.md: ele carrega docs/, references/, scripts/ e schemas/ conforme a tarefa.

## Codex

Para instalação como skill pessoal, clone o repo inteiro no diretório de skills do agente:

~~~bash
git clone https://github.com/eidryan/slideskill ~/.agents/skills/slide-director
~~~

Windows PowerShell:

~~~powershell
git clone https://github.com/eidryan/slideskill "$HOME\.agents\skills\slide-director"
~~~

Depois, reinicie ou recarregue a sessão do agente caso ele não descubra novas skills automaticamente. Solicite: "Use a skill slide-director para criar um storyboard e gerar a apresentação".

## Claude Code

~~~bash
git clone https://github.com/eidryan/slideskill ~/.claude/skills/slide-director
~~~

Ou, para utilização somente em um projeto, coloque o repositório em .claude/skills/slide-director dentro desse projeto. Isso não instala nem confere permissões adicionais a Claude; a disponibilidade exata depende da configuração da ferramenta.

## Rodar o MVP sem agente

~~~bash
python3 scripts/search_library.py --purpose compare_options --relation comparison
python3 scripts/validate_manifest.py examples/demo-consulting.json
python3 -m unittest discover -s tests -v
npm install
npm run build:demo
~~~

Resultado: dist/demo-consulting.pptx. O gerador demonstra 6 formatos, não resolve todo layout de apresentação. Inspecione no PowerPoint real para aprovação visual.

## Exemplo via GitHub Actions

Na aba Actions, abra a execução mais recente do workflow "verify". Após sucesso, procure o artefato **slide-director-demo-pptx**, que contém o arquivo PPTX da demonstração; o artefato expira após 14 dias. O CI verifica integridade OOXML e presença de notas, mas **não** julga qualidade visual.

## Atualizações

~~~bash
git -C ~/.agents/skills/slide-director pull
~~~

O caminho pode variar se você instalou em outro local. Esta release é uma fundação; antes de uso profissional, consulte docs/QA.md e docs/PLAN.md.
