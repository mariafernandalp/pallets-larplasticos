import express from 'express';
import { config } from 'dotenv';
config();

const app = express();
const PORT = process.env.PORT || 3001;

const PLOOMES = {
  apiKey: process.env.PLOOMES_API_KEY,
  baseUrl: 'https://api2.ploomes.com',
  originId: 120001462,
  pipelineId: 40059663,
  stageId: 40291620,
  fieldTelefone: 'deal_03E33AAB-3BB7-4A9F-875F-0A62A739AACE',
  fieldNomeEmpresa: 'deal_9A215258-A86E-4499-8B13-7FF4464CB5EA',
  owners: [40040909, 40040910, 40040905, 40040917, 120001793, 40040920],
};

let filaIdx = 0;
function proximoOwner() {
  const owner = PLOOMES.owners[filaIdx % PLOOMES.owners.length];
  filaIdx = (filaIdx + 1) % PLOOMES.owners.length;
  return owner;
}

app.use(express.json());

app.post('/api/create-deal', async (req, res) => {
  try {
    const { nome, whatsapp, email, empresa, mensagem } = req.body;

    const telefone = String(whatsapp || '').replace(/\D/g, '');
    const telefoneFinal = telefone && telefone.length <= 11 && !telefone.startsWith('55')
      ? '55' + telefone
      : telefone;

    const titulo = `LEADS META REVENDA - ${nome || 'Sem nome'} - ${telefoneFinal || 'sem telefone'}`;
    const nomeEmpresa = empresa ? `${nome} - ${empresa}` : nome;

    const ownerId = proximoOwner();

    const payload = {
      Title: titulo,
      OriginId: PLOOMES.originId,
      OwnerId: ownerId,
      PipelineId: PLOOMES.pipelineId,
      StageId: PLOOMES.stageId,
      OtherProperties: [
        { FieldKey: PLOOMES.fieldTelefone, StringValue: telefoneFinal },
        { FieldKey: PLOOMES.fieldNomeEmpresa, StringValue: nomeEmpresa },
      ],
    };

    const resp = await fetch(`${PLOOMES.baseUrl}/Deals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Key': PLOOMES.apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Ploomes ${resp.status}: ${text}`);
    }

    const data = await resp.json();
    res.json({ success: true, dealId: data.value?.[0]?.Id });
  } catch (err) {
    console.error('Erro ao criar deal:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use(express.static('dist'));

app.get('*', (_req, res) => {
  res.sendFile('dist/index.html', { root: '.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
