import { useTranslations } from "next-intl";
import apiClient from "@/services/apiClient";

interface ComparisonData {
  [key: string]: {
    [productTitle: string]: string | number;
  };
}

export function getProductIdsFromSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): string[] {
  const ids = searchParams.product_ids;
  if (Array.isArray(ids)) return ids;
  if (typeof ids === "string") return [ids];
  return [];
}

export async function fetchComparisonData(productIds: string[]): Promise<{
  comparisonData: ComparisonData | null;
  error: string | null;
}> {
  try {
    const response = await apiClient(
      `/compare/?product_ids=${productIds.join("&product_ids=")}`
    );
    console.log(response.data);
    return {
      comparisonData: response.data,
      error: null,
    };
  } catch (err) {
    return {
      comparisonData: null,
      error:
        err instanceof Error ? err.message : "Failed to load comparison data",
    };
  }
}

export default function ComparisonTable({
  comparisonData,
}: {
  comparisonData: ComparisonData;
}) {
  const t = useTranslations("ComparisonTable");

  const productKeys = Object.keys(comparisonData);
  const featureKeys = Object.keys(comparisonData).filter(
    (key) => key !== "Title" && key !== "Images"
  );
  const productTitles = Object.keys(comparisonData["Title"] || {});
  const productImages = Object.keys(comparisonData["Images"] || {});

  return (
    <section className="p-10">
      <h1 className="text-4xl">{t("title")}</h1>
      <div className="py-10">
        <div>
          <div>
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>
                    <h6 className="text-lg">{t("headerTitle")}</h6>
                  </th>
                  {productTitles.map((title, index) => (
                    <th className="text-md" key={index}>
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h6>{t("imageLabel")}</h6>
                  </td>
                  {productImages.map((image, index) => (
                    <td key={index}>
                      <img
                        src={`http://localhost:8002/media/${comparisonData["Images"]?.[image]}`}
                        alt={image}
                        className="w-[6rem]"
                      />
                    </td>
                  ))}
                </tr>
                {featureKeys.map((featureKey, index) => (
                  <tr key={index}>
                    <td>
                      <h6>{featureKey}</h6>
                    </td>
                    {productTitles.map((productTitle, idx) => (
                      <td key={idx}>
                        {comparisonData[featureKey]?.[productTitle]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
