

export function validateUserInput(obj: {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  role: string | undefined;
}): string {
  // Validate name (required and must not be empty)
  if (!obj.name || obj.name.length === 0) {
    return "Name is required.";
  }

  // Validate email (required and must be a valid email format)
  if (!obj.email || obj.email.length === 0) {
    return "Email is required.";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(obj.email)) {
    return "Invalid email format.";
  }

  // Validate password (required and minimum length)
  if (!obj.password || obj.password.length === 0) {
    return "Password is required.";
  } else if (obj.password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (
    !obj.confirmPassword ||
    !obj.password ||
    obj.password.length === 0 ||
    obj.password != obj.confirmPassword
  ) {
    return "Password is not matching.";
  } else if (obj.password.length < 8) {
    return "Password is not matching.";
  }

  // Validate role (required and must be either 'BRAND' or 'CREATOR')
  const validRoles = ["BRAND", "CREATOR"];
  if (!obj.role || obj.role.length === 0) {
    return "Role is required.";
  } else if (!validRoles.includes(obj.role)) {
    return "Role must be either 'BRAND' or 'CREATOR'.";
  }

  return "";
}


export const loginUserValidation = (obj: {
    email: string | undefined;
  password: string | undefined;
  role: string | undefined;
}) => {
  if (!obj.email || obj.email.length === 0) {
    return "Email is required.";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(obj.email)) {
    return "Invalid email format.";
  }

  const validRoles = ["BRAND", "CREATOR"];
  if (!obj.role || obj.role.length === 0) {
    return "Role is required.";
  } else if (!validRoles.includes(obj.role)) {
    return "Role must be either 'BRAND' or 'CREATOR'.";
  }

  if (!obj.password || obj.password.length === 0) {
    return "Password is required.";
  } else if (obj.password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  return ''
};
