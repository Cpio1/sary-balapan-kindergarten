/**
 * Подтверждённые контактные данные детского сада.
 * Меняйте только здесь — все кнопки и ссылки сайта берут данные отсюда.
 */
export const site = {
  name: "Сары балапан",
  address: "Телжан Шонанулы, 54А",
  phoneDisplay: "+7 707 615 56 83",
  phoneHref: "tel:+77076155683",
  whatsappNumber: "77076155683",
  hours: "07:30–18:00",
  instagramUrl: "https://www.instagram.com/reel/DfmE4_4Mu84/?mdxt=Y3JjYmRjNnQ5NGVp",
  /** Поиск по адресу в 2GIS (город не указан, т.к. не подтверждён). */
  twoGisSearchUrl: `https://2gis.kz/search/${encodeURIComponent("Телжан Шонанулы 54А")}`,
  /**
   * Необязательно: ссылка для встраивания карты 2GIS (iframe), например
   * официальный виджет организации. Пока пусто — показывается карточка
   * с адресом и кнопкой «Открыть в 2GIS».
   */
  twoGisEmbedUrl: "",
} as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
