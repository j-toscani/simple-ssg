export default function fillTemplate(
  template: string,
  attribute: Record<string, any>
) {
  const keys = getKeys(template);
  keys.forEach((key) => {
    template = template.replace(`{{ ${key} }}`, attribute[key] ?? "");
  });

  return template;
}

function getKeys(template: string) {
  const regex = new RegExp(/{{(.*)}}/gm);
  const matches = template.matchAll(regex);

  const keys: string[] = [];
  for (const match of matches) {
    keys.push(match[1].trim());
  }
  return keys;
}
