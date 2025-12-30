"""
Google reCAPTCHA v3 verification utility
"""
import logging
import requests
from django.conf import settings

logger = logging.getLogger('django')


def verify_recaptcha(token: str, remote_ip: str = None) -> tuple[bool, float, list]:
    """
    Verify a reCAPTCHA v3 token with Google's servers

    Args:
        token: The reCAPTCHA token from the client
        remote_ip: Optional IP address of the client

    Returns:
        Tuple of (is_valid, score, error_codes)
        - is_valid: Boolean indicating if verification passed
        - score: Float between 0.0-1.0 (higher = more likely human)
        - error_codes: List of error codes if verification failed
    """
    # Get reCAPTCHA secret from settings
    secret_key = getattr(settings, 'RECAPTCHA_SECRET_KEY', '')

    if not secret_key:
        logger.warning("RECAPTCHA_SECRET_KEY not configured - skipping verification")
        return True, 1.0, []  # Skip verification if not configured

    if not token:
        logger.warning("No reCAPTCHA token provided")
        return False, 0.0, ['missing-input-response']

    # Prepare verification request
    url = 'https://www.google.com/recaptcha/api/siteverify'
    data = {
        'secret': secret_key,
        'response': token,
    }

    if remote_ip:
        data['remoteip'] = remote_ip

    try:
        # Make verification request to Google
        response = requests.post(url, data=data, timeout=5)
        response.raise_for_status()
        result = response.json()

        success = result.get('success', False)
        score = result.get('score', 0.0)
        error_codes = result.get('error-codes', [])

        # Log the verification result
        if success:
            logger.info(
                f"reCAPTCHA verification successful - Score: {score:.2f}"
            )
        else:
            logger.warning(
                f"reCAPTCHA verification failed - Errors: {error_codes}"
            )

        return success, score, error_codes

    except requests.RequestException as e:
        logger.error(f"reCAPTCHA verification request failed: {str(e)}")
        # In case of network errors, we might want to allow the request
        # or reject it based on your security requirements
        return False, 0.0, ['network-error']


def check_recaptcha_score(score: float, threshold: float = 0.5) -> bool:
    """
    Check if reCAPTCHA score meets the threshold

    Args:
        score: The score returned by Google (0.0 - 1.0)
        threshold: Minimum acceptable score (default: 0.5)

    Returns:
        Boolean indicating if score is acceptable

    Score interpretation:
        0.0 - 0.3: Very likely a bot
        0.3 - 0.7: Suspicious, could be bot or human
        0.7 - 1.0: Very likely human
    """
    return score >= threshold
