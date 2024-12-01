
  export function calculateAge(dob:string) {
    if (!dob) throw new Error("Date of birth is required");

    const dobDate:any = new Date(dob);
    const today = new Date();

    if (isNaN(dobDate)) throw new Error("Invalid date format. Use 'YYYY-MM-DD'.");

    let age = today.getFullYear() - dobDate.getFullYear();

    const isBirthdayPassed =
        today.getMonth() > dobDate.getMonth() ||
        (today.getMonth() === dobDate.getMonth() && today.getDate() >= dobDate.getDate());

    if (!isBirthdayPassed) {
        age--;
    }

    return age;
}