#!/bin/bash
echo $FEATURE_DOMAIN:
echo $ENV:
echo $TEST_SUITE_NAME;

sudo apt-get update
sudo apt-get install -y whois dnsutils

# Retrieve the value of the environment variable
feature_domain=$FEATURE_DOMAIN
sub_domain="sub."
endpoint="/api/health"

# Concatenation method
full_domain="${sub_domain}${feature_domain}${endpoint}"
full_sub_domain="${sub_domain}${feature_domain}"
echo "$full_domain"

# Check if the variable is set
if [[ -n $feature_domain ]]; then
  # Ping the server
  # curl -s -o response.txt -w "%{http_code}" ""
  response=$(curl -s -o response.txt -w "%{http_code}" "$full_domain")

  # Check the HTTP response code
  if [ "$response" -eq 200 ]; then
      echo "Server is reachable and returned a successful response. Status code: $response"
      echo "Response body:"
      cat response.txt
  else
      echo "Server is not reachable or returned an error response with status code: $response"
  fi

  # Retrieve domain info using WHOIS
  whois $feature_domain

  # Retrieve domain info using DNS lookup
  nslookup $feature_domain

  timeout 3 openssl s_client -connect "$full_sub_domain:443"
  
  exit 0
else
  echo "Environment variable FEATURE_DOMAIN is not set."
fi

# EOF