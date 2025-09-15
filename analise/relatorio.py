
import json
import os

data_dir = os.path.join(os.path.dirname(__file__), '../backend/data')

# Função para contar itens em um arquivo JSON
def contar_itens_json(nome_arquivo):
	caminho = os.path.join(data_dir, nome_arquivo)
	try:
		with open(caminho, 'r', encoding='utf-8') as f:
			dados = json.load(f)
			return len(dados)
	except Exception as e:
		print(f"Erro ao ler {nome_arquivo}: {e}")
		return 0

# Tarefas
qtd_pendentes = contar_itens_json('tarefas-pendentes-15-09-2025.json')
qtd_concluidas = contar_itens_json('tarefas-concluidas-15-09-2025.json')


# Projetos
qtd_proj_andamento = contar_itens_json('projetos-andamento-15-09-2025.json')
qtd_proj_concluidos = contar_itens_json('projetos-concluidos-15-09-2025.json')


# Data do relatório
from datetime import datetime
hoje = datetime.now()
data_formatada = hoje.strftime('%d/%m/%Y')

relatorio = (
	f"Relatório do dia {data_formatada}\n"
	f"Tarefas pendentes: {qtd_pendentes}\n"
	f"Tarefas concluídas: {qtd_concluidas}\n"
	f"Projetos em andamento: {qtd_proj_andamento}\n"
	f"Projetos concluídos: {qtd_proj_concluidos}\n"
)

print(relatorio)

# Salvar em relatorio.txt
with open(os.path.join(os.path.dirname(__file__), 'relatorio.txt'), 'w', encoding='utf-8') as f:
	f.write(relatorio)

