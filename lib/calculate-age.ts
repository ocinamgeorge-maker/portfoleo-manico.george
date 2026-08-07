const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

type DateParts = {
  year: number;
  month: number;
  day: number;
};

function parseIsoDate(date: string): DateParts {
  const match = ISO_DATE_PATTERN.exec(date);

  if (!match) {
    throw new RangeError("Birth date must use the YYYY-MM-DD format.");
  }

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const candidate = new Date(Date.UTC(year, month - 1, day));

  if (
    candidate.getUTCFullYear() !== year ||
    candidate.getUTCMonth() !== month - 1 ||
    candidate.getUTCDate() !== day
  ) {
    throw new RangeError("Birth date must be a valid calendar date.");
  }

  return { year, month, day };
}

export function calculateAge(
  birthDate: string,
  referenceDate = new Date(),
): number {
  const birth = parseIsoDate(birthDate);
  const reference = {
    year: referenceDate.getUTCFullYear(),
    month: referenceDate.getUTCMonth() + 1,
    day: referenceDate.getUTCDate(),
  };

  const birthdayHasPassed =
    reference.month > birth.month ||
    (reference.month === birth.month && reference.day >= birth.day);
  const age = reference.year - birth.year - (birthdayHasPassed ? 0 : 1);

  if (age < 0) {
    throw new RangeError("Birth date cannot be in the future.");
  }

  return age;
}