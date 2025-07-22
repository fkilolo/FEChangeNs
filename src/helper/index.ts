import { LOCAL_DATE } from "@/constants/common";
import { DateRangeType } from "@/types/common";
import dayjs, { ManipulateType } from "dayjs";
import utc from 'dayjs/plugin/utc';
import { isArray, isEmpty, isObject } from "lodash";
import { useEffect, useState } from "react";
dayjs.extend(utc);

export const buildQuery = (params?: any, sort?: any, filter?: any) => {
  let query = new URLSearchParams(removeValuelessValueInObject({ ...params, ...filter })).toString();

  let sortBy = "";

  if (!isEmpty(sort)) {
    sortBy = `sort=${Object.values(sort)[0] === "ascend" ? "" : "-"}${Object.keys(sort)[0]
      }`;
  } else {
    sortBy = "sort=-updatedAt";
  }
  query = `${sortBy}&${query}`;

  return query;
};

export const useInputDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const removeValuelessValueInObject = (obj: Record<string, any>) => {
  const keys = Object.keys(obj);
  const arrayObj = keys
    .map((key) => {
      if (!isEmpty(obj[key]) || (typeof obj[key] !== 'object' && obj[key] !== undefined && obj[key] !== null)) {
        return { [key]: obj[key] };
      }
      return;
    })
    .filter(Boolean);
  return Object.assign({}, ...arrayObj);
};

// date type from antd date picker -> dayjs
export const convertDateType = (dateType: DateRangeType): ManipulateType => {
  if (dateType === "date") return "day";
  return dateType as ManipulateType;
};

export const splitDateRange = (
  startDate?: string,
  endDate?: string,
  type: DateRangeType = "date"
): string[] => {
  if (!startDate || !endDate) return [];

  const _type = convertDateType(type);
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const dateArray: string[] = [];

  let startClone = start;
  let dayPlus = 1;
  const formatType = (() => {
    if (type === "date") return LOCAL_DATE.VIET_NAM;
    if (type === "month") return LOCAL_DATE.MONTH_YEAR;
    if (type === "year") return LOCAL_DATE.YEAR;
  })();
  while (startClone.valueOf() <= end.endOf("day").valueOf()) {
    dateArray.push(dayjs(startClone).format(formatType));
    startClone = start.add(dayPlus, _type);
    dayPlus++;
  }

  return dateArray;
};

export const isFullfilledObject = (object: Record<string, any>) => {
  if (isObject(object)) {
    let isFullFilled = true;
    const keys = Object.keys(object);
    keys.every((key) => {
      if (
        (isArray(object[key]) || isObject(object[key])) &&
        isEmpty(object[key])
      ) {
        isFullFilled = false;
        return false;
      } else if (!object[key]) {
        isFullFilled = false;
        return false;
      }
      return true;
    });

    return isFullFilled;
  }
  return false;
};

export const sumPriceCartUSD = (cartInfo: any) => {
  let totalPriceUSD = 0;
  if (cartInfo) {
    cartInfo?.forEach((element: any) => {
      totalPriceUSD += element.priceUSD;
    });
  }
  return totalPriceUSD.toFixed(2);
}

export const sumPriceCartVND = (cartInfo: any) => {
  let totalPriceVND = 0;
  if (cartInfo) {
    cartInfo?.forEach((element: any) => {
      totalPriceVND += element.priceVND;
    });
  }
  return totalPriceVND.toFixed(2);
}

export const sumAndConvertPriceVND = (cartInfo: any) => {
  let totalPriceVND = 0;
  if (cartInfo) {
    cartInfo?.forEach((element: any) => {
      totalPriceVND += element.priceVND;
    });
  }
  const round = totalPriceVND.toFixed(2);
  return parseInt(round).toLocaleString('en');
}

export const calculateAndConvertVNDDomain = (priceUSD?: string, exchangeRate?: string) => {
  const totalPriceVND = +(priceUSD || 0) * +(exchangeRate || 0);
  const round = totalPriceVND.toFixed(2);
  return parseInt(round).toLocaleString('en');
}

export const calculateVND = (priceUSD?: string, exchangeRate?: string) => {
  const totalPriceVND = +(priceUSD || 0) * +(exchangeRate || 0);
  return totalPriceVND.toFixed(2);
}

export const calculateFixedUSD = (priceUSD?: number) => {
  const totalPriceUSD = +(priceUSD || 0);
  return totalPriceUSD.toFixed(2);
}

export function convertToGMT7(date: string): string {
  try {
    const dateStr = /[zZ]|[+-]\d{2}(:?\d{2})?$/.test(date) ? date : date + 'Z';
    const parsedDate = dayjs.utc(dateStr);
    if (!parsedDate.isValid()) {
      return 'Invalid date format';
    }
    const gmt7Date = parsedDate.add(7, 'hour');
    return gmt7Date.format('DD/MM/YYYY HH:mm:ss');
  } catch (error) {
    return 'Invalid date format';
  }
}