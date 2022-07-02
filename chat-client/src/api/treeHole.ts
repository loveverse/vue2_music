import { get } from "@utils/http/index";

const getFindExcerptData = async () => get({ url: "/tree/findExcerpt" });
const getAddExcerptData = async (params: any) =>
  get({ url: "/tree/addExcerpt", params });
const getUpdateExcerptData = async (id: string, content: string) =>
  get({ url: "/tree/updateExcerpt", params: { id: id, content: content } });
const getDelExcerptData = async (id: string) =>
  get({ url: "/tree/delExcerpt", params: { id } });

export {
  getFindExcerptData,
  getAddExcerptData,
  getUpdateExcerptData,
  getDelExcerptData,
};
