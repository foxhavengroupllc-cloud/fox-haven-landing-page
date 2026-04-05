import PptxGenJS from 'pptxgenjs';

const BG = '0A0A0A';
const ACCENT = '00FF87';
const WHITE = 'FFFFFF';
const GRAY = '999999';
const FONT = 'Helvetica Neue';

function val(map: Record<string, string>, key: string): string {
  return map[key] ?? '';
}

export async function generatePitchDeck(
  placeholderMap: Record<string, string>,
  companyName: string,
): Promise<Buffer> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Fox Haven Group';
  pptx.title = `Fox Haven Pitch - ${companyName}`;

  const m = placeholderMap;

  // ── Slide 1: Cover ──
  const s1 = pptx.addSlide();
  s1.background = { color: BG };
  s1.addText(val(m, '{{positioning_headline}}'), {
    x: 0.8,
    y: 1.2,
    w: 10,
    h: 2,
    fontSize: 36,
    fontFace: FONT,
    color: WHITE,
    bold: true,
    lineSpacingMultiple: 1.1,
  });
  s1.addText(
    [
      { text: val(m, '{{company_name}}'), options: { color: ACCENT, bold: true } },
      { text: `  ·  ${val(m, '{{industry}}')}`, options: { color: GRAY } },
    ],
    { x: 0.8, y: 3.5, w: 10, h: 0.5, fontSize: 16, fontFace: FONT },
  );
  s1.addText('Fox Haven Group', {
    x: 9.5,
    y: 6.5,
    w: 3,
    h: 0.4,
    fontSize: 11,
    fontFace: FONT,
    color: GRAY,
    align: 'right',
  });

  // ── Slide 2: Company Summary ──
  const s2 = pptx.addSlide();
  s2.background = { color: BG };
  addSectionLabel(s2, 'ASSESSMENT');
  s2.addText(val(m, '{{company_summary}}'), {
    x: 0.8,
    y: 2,
    w: 10,
    h: 3,
    fontSize: 20,
    fontFace: FONT,
    color: WHITE,
    lineSpacingMultiple: 1.4,
  });

  // ── Slide 3: Pain Points ──
  const s3 = pptx.addSlide();
  s3.background = { color: BG };
  addSectionLabel(s3, 'OBSERVATIONS');
  const pains = [val(m, '{{pain_1}}'), val(m, '{{pain_2}}'), val(m, '{{pain_3}}')].filter(Boolean);
  pains.forEach((pain, i) => {
    s3.addText(pain, {
      x: 0.8,
      y: 2 + i * 1.2,
      w: 10,
      h: 0.8,
      fontSize: 18,
      fontFace: FONT,
      color: WHITE,
      bullet: { type: 'number', numberStartAt: i + 1, style: ACCENT },
    });
  });

  // ── Slide 4: Inefficiencies ──
  const s4 = pptx.addSlide();
  s4.background = { color: BG };
  addSectionLabel(s4, 'DIAGNOSIS');
  for (let i = 1; i <= 3; i++) {
    const area = val(m, `{{inefficiency_area_${i}}}`);
    const issue = val(m, `{{inefficiency_issue_${i}}}`);
    const impact = val(m, `{{inefficiency_impact_${i}}}`);
    if (!area && !issue) continue;
    const yBase = 1.6 + (i - 1) * 1.5;
    s4.addText(area, {
      x: 0.8,
      y: yBase,
      w: 2.5,
      h: 0.4,
      fontSize: 12,
      fontFace: FONT,
      color: ACCENT,
      bold: true,
      isTextBox: true,
    });
    s4.addText(issue, {
      x: 3.5,
      y: yBase,
      w: 5,
      h: 0.4,
      fontSize: 16,
      fontFace: FONT,
      color: WHITE,
    });
    s4.addText(impact, {
      x: 3.5,
      y: yBase + 0.5,
      w: 5,
      h: 0.4,
      fontSize: 13,
      fontFace: FONT,
      color: GRAY,
    });
  }

  // ── Slide 5: Opportunities ──
  const s5 = pptx.addSlide();
  s5.background = { color: BG };
  addSectionLabel(s5, 'OPPORTUNITY');
  const opps = [val(m, '{{opportunity_1}}'), val(m, '{{opportunity_2}}'), val(m, '{{opportunity_3}}')].filter(Boolean);
  opps.forEach((opp, i) => {
    s5.addText(opp, {
      x: 0.8,
      y: 2 + i * 1.2,
      w: 10,
      h: 0.8,
      fontSize: 18,
      fontFace: FONT,
      color: WHITE,
      bullet: { type: 'number', numberStartAt: i + 1, style: ACCENT },
    });
  });

  // ── Slide 6: Quick Win + Impact ──
  const s6 = pptx.addSlide();
  s6.background = { color: BG };
  addSectionLabel(s6, 'FIRST MOVE');
  s6.addText(val(m, '{{quick_win}}'), {
    x: 0.8,
    y: 2,
    w: 10,
    h: 1.5,
    fontSize: 22,
    fontFace: FONT,
    color: WHITE,
    bold: true,
    lineSpacingMultiple: 1.3,
  });
  s6.addText(`${val(m, '{{impact_low}}')}  –  ${val(m, '{{impact_high}}')}`, {
    x: 0.8,
    y: 4,
    w: 10,
    h: 0.8,
    fontSize: 28,
    fontFace: FONT,
    color: ACCENT,
    bold: true,
  });
  s6.addText(val(m, '{{impact_label}}'), {
    x: 0.8,
    y: 4.8,
    w: 10,
    h: 0.5,
    fontSize: 14,
    fontFace: FONT,
    color: GRAY,
  });

  // ── Slide 7: 90-Day Plan ──
  const s7 = pptx.addSlide();
  s7.background = { color: BG };
  addSectionLabel(s7, '90-DAY PLAN');
  const months = [
    { label: 'Month 1', key: '{{month_1}}' },
    { label: 'Month 2', key: '{{month_2}}' },
    { label: 'Month 3', key: '{{month_3}}' },
  ];
  months.forEach((mo, i) => {
    const xPos = 0.8 + i * 3.8;
    s7.addText(mo.label, {
      x: xPos,
      y: 2,
      w: 3.2,
      h: 0.5,
      fontSize: 13,
      fontFace: FONT,
      color: ACCENT,
      bold: true,
    });
    s7.addText(val(m, mo.key), {
      x: xPos,
      y: 2.6,
      w: 3.2,
      h: 2,
      fontSize: 16,
      fontFace: FONT,
      color: WHITE,
      lineSpacingMultiple: 1.3,
      valign: 'top',
    });
  });

  // ── Slide 8: Engagement Options ──
  const s8 = pptx.addSlide();
  s8.background = { color: BG };
  addSectionLabel(s8, 'ENGAGEMENT');
  for (let i = 1; i <= 3; i++) {
    const name = val(m, `{{engagement_${i}_name}}`);
    const desc = val(m, `{{engagement_${i}_desc}}`);
    if (!name) continue;
    const xPos = 0.8 + (i - 1) * 3.8;
    s8.addText(name, {
      x: xPos,
      y: 2,
      w: 3.2,
      h: 0.5,
      fontSize: 16,
      fontFace: FONT,
      color: ACCENT,
      bold: true,
    });
    s8.addText(desc, {
      x: xPos,
      y: 2.7,
      w: 3.2,
      h: 2,
      fontSize: 14,
      fontFace: FONT,
      color: GRAY,
      lineSpacingMultiple: 1.3,
      valign: 'top',
    });
  }

  // ── Slide 9: Risk & Governance ──
  const s9 = pptx.addSlide();
  s9.background = { color: BG };
  addSectionLabel(s9, 'GOVERNANCE');
  const risks = [val(m, '{{risk_1}}'), val(m, '{{risk_2}}'), val(m, '{{risk_3}}')].filter(Boolean);
  risks.forEach((risk, i) => {
    s9.addText(risk, {
      x: 0.8,
      y: 2 + i * 1.2,
      w: 10,
      h: 0.8,
      fontSize: 18,
      fontFace: FONT,
      color: WHITE,
      bullet: { type: 'number', numberStartAt: i + 1, style: ACCENT },
    });
  });

  // ── Slide 10: Closing ──
  const s10 = pptx.addSlide();
  s10.background = { color: BG };
  s10.addText("Let's build this.", {
    x: 0,
    y: 2,
    w: '100%',
    h: 2,
    fontSize: 40,
    fontFace: FONT,
    color: ACCENT,
    bold: true,
    align: 'center',
    valign: 'middle',
  });
  s10.addText('Fox Haven Group · foxhavengroup.com', {
    x: 0,
    y: 5,
    w: '100%',
    h: 0.5,
    fontSize: 14,
    fontFace: FONT,
    color: GRAY,
    align: 'center',
  });

  // Generate buffer
  const arrayBuffer = await pptx.write({ outputType: 'arraybuffer' }) as ArrayBuffer;
  return Buffer.from(arrayBuffer);
}

function addSectionLabel(slide: PptxGenJS.Slide, label: string) {
  slide.addText(label, {
    x: 0.8,
    y: 0.6,
    w: 4,
    h: 0.4,
    fontSize: 11,
    fontFace: FONT,
    color: ACCENT,
    bold: true,
    charSpacing: 4,
  });
  slide.addShape('rect' as PptxGenJS.ShapeType, {
    x: 0.8,
    y: 1.1,
    w: 1.2,
    h: 0.03,
    fill: { color: ACCENT },
  });
}
