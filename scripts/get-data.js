// go to https://openmoji.org/data/openmoji.json.gz
// then run the following code from the browser console

const raw = JSON.parse(document.querySelector('pre').innerText).filter(i => i.group !== 'extras-unicode' && i.group !== 'extras-openmoji')
const transform = (rawItem) => ({
    emoji: rawItem.emoji,
    hexcode: rawItem.hexcode,
    group: rawItem.group,
    annotation: rawItem.annotation,
    tags: Array.from(new Set([...rawItem.tags.split(", "), ...rawItem.openmoji_tags.split(", ")].filter(Boolean))).sort(),
    unicode: rawItem.unicode,
    order: rawItem.order,
    skintone: rawItem.skintone,
    skintone_combination: rawItem.skintone_combination,
    skintone_variants: [],
    src: `emoji_u${rawItem.hexcode.replaceAll('-FE0F', '').replaceAll('-FE0E', '').replaceAll('-', '_').toLowerCase()}.svg`
})
const data = raw.filter(i => i.skintone_base_emoji === "" || i.skintone_base_emoji === i.emoji).map(transform)
raw.forEach(i => {
    if (i.skintone_base_emoji === "" || i.skintone_base_emoji === i.emoji)
        return;
    const basemoji = data.find(b => b.hexcode === i.skintone_base_hexcode)
    try {
        basemoji.skintone_variants.push(transform(i))
    } catch(e) {
        console.log('error at ' + i.hexcode + ' , base: ' + i.skintone_base_hexcode)
        throw e
    }
})
console.log(JSON.stringify(data, null, 2))