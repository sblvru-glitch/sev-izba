import {
  BuildingCanadianLoggingInfo,
  buildingCanadianLoggingMetaDescription,
  buildingCanadianLoggingPageTitle,
} from "./services-content/building-canadian-logging";
import {
  BuildingLumberInfo,
  buildingLumberMetaDescription,
  buildingLumberPageTitle,
} from "./services-content/building-lumber";
import {
  BuildingManualLoggingInfo,
  buildingManualLoggingMetaDescription,
  buildingManualLoggingPageTitle,
} from "./services-content/building-manual-logging";
import {
  BuildingPostAndBeamInfo,
  buildingPostAndBeamMetaDescription,
  buildingPostAndBeamPageTitle,
} from "./services-content/building-post-and-beam";
import {
  BuildingProfileInfo,
  buildingProfileMetaDescription,
  buildingProfilePageTitle,
} from "./services-content/building-profile";
import {
  BuildingRoundLogsInfo,
  buildingRoundLogsMetaDescription,
  buildingRoundLogsPageTitle,
} from "./services-content/building-round-logs";
import {
  Design3dVisualizationInfo,
  design3dVisualizationMetaDescription,
  design3dVisualizationPageTitle,
} from "./services-content/design-3d-visualization";
import {
  DesignDesignInfo,
  designDesignMetaDescription,
  designDesignPageTitle,
} from "./services-content/design-design";
import {
  DesignDesignProjectInfo,
  designDesignProjectMetaDescription,
  designDesignProjectPageTitle,
} from "./services-content/design-design-project";
import {
  DesignPremiumInfo,
  designPremiumMetaDescription,
  designPremiumPageTitle,
} from "./services-content/design-premium";
import {
  DesignProjectExtendedInfo,
  designProjectExtendedMetaDescription,
  designProjectExtendedPageTitle,
} from "./services-content/design-project-extended";
import {
  DesignStandardInfo,
  designStandardMetaDescription,
  designStandardPageTitle,
} from "./services-content/design-standard";

export const servicesData = [
  {
    id: 1,
    name: "Строительство",
    description: "building",
    items: [
      {
        name: "Клееный брус",
        description: "lumber",
        price: "35 000",
        pageTitle: buildingLumberPageTitle,
        metaDescription: buildingLumberMetaDescription,
        info: <BuildingLumberInfo />,
      },
      {
        name: "Профилированный брус",
        description: "profile",
        price: "25 000",
        pageTitle: buildingProfilePageTitle,
        metaDescription: buildingProfileMetaDescription,
        info: <BuildingProfileInfo />,
      },
      {
        name: "Ручная рубка - срубы",
        description: "manual-logging",
        price: "25 000",
        pageTitle: buildingManualLoggingPageTitle,
        metaDescription: buildingManualLoggingMetaDescription,
        info: <BuildingManualLoggingInfo />,
      },
      {
        name: "Дома Post and Beam",
        description: "post-and-beam",
        price: "35 000",
        pageTitle: buildingPostAndBeamPageTitle,
        metaDescription: buildingPostAndBeamMetaDescription,
        info: <BuildingPostAndBeamInfo />,
      },
      {
        name: "Оцилиндрованное бревно",
        description: "round-logs",
        price: "18 000",
        pageTitle: buildingRoundLogsPageTitle,
        metaDescription: buildingRoundLogsMetaDescription,
        info: <BuildingRoundLogsInfo />,
      },
      {
        name: "Канадская рубка",
        description: "canadian-logging",
        price: "22 000",
        pageTitle: buildingCanadianLoggingPageTitle,
        metaDescription: buildingCanadianLoggingMetaDescription,
        info: <BuildingCanadianLoggingInfo />,
      },
    ],
  },
  {
    id: 2,
    name: "Проектирование",
    description: "design",
    items: [
      {
        name: "Проектирование",
        description: "design",
        price: "100 000",
        pageTitle: designDesignPageTitle,
        metaDescription: designDesignMetaDescription,
        info: <DesignDesignInfo />,
      },
      {
        name: "Стандартный",
        description: "standard",
        price: "150 000",
        pageTitle: designStandardPageTitle,
        metaDescription: designStandardMetaDescription,
        info: <DesignStandardInfo />,
      },
      {
        name: "Премиум",
        description: "premium",
        price: "200 000",
        pageTitle: designPremiumPageTitle,
        metaDescription: designPremiumMetaDescription,
        info: <DesignPremiumInfo />,
      },
      {
        name: "Дизайн-проект",
        description: "design-project",
        price: "100 000",
        pageTitle: designDesignProjectPageTitle,
        metaDescription: designDesignProjectMetaDescription,
        info: <DesignDesignProjectInfo />,
      },
      {
        name: "3D-визуализация",
        description: "3d-visualization",
        price: "100 000",
        pageTitle: design3dVisualizationPageTitle,
        metaDescription: design3dVisualizationMetaDescription,
        info: <Design3dVisualizationInfo />,
      },
      {
        name: "Дизайн-проект",
        description: "design-project-extended",
        price: "100 000",
        pageTitle: designProjectExtendedPageTitle,
        metaDescription: designProjectExtendedMetaDescription,
        info: <DesignProjectExtendedInfo />,
      },
    ],
  },
];

/** Все slug страниц услуг для статической генерации */
export function getAllServiceSlugs(): { "services-info": string }[] {
  return servicesData.flatMap((category) =>
    category.items.map((item) => ({
      "services-info": `${category.description}-${item.description}`,
    }))
  );
}

/** Slug в URL: "categoryDescription-itemDescription", например building-lumber, design-3d-visualization */
export function getServiceItemBySlug(slug: string) {
  for (const category of servicesData) {
    const item = category.items.find(
      (i) => slug === `${category.description}-${i.description}`
    );
    if (item)
      return {
        ...item,
        categoryName: category.name,
        categoryDescription: category.description,
      };
  }
  return null;
}
