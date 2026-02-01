#!/bin/bash

# Function to check if a port is available
check_port_available() {
    local port=$1
    if kubectl get service -n devops-portfolio -o jsonpath='{.items[*].spec.ports[*].nodePort}' 2>/dev/null | grep -q "\b$port\b"; then
        return 1  # Port is in use
    fi
    
    # Check if port is in use by other services in all namespaces
    if kubectl get service --all-namespaces -o jsonpath='{.items[*].spec.ports[*].nodePort}' 2>/dev/null | grep -q "\b$port\b"; then
        return 1  # Port is in use
    fi
    
    return 0  # Port is available
}

# Function to find an available port starting from a given port
find_available_port() {
    local start_port=$1
    local max_attempts=10
    local current_port=$start_port
    
    for i in $(seq 1 $max_attempts); do
        if check_port_available $current_port; then
            echo $current_port
            return 0
        fi
        current_port=$((current_port + 1))
    done
    
    echo "ERROR: Could not find an available port starting from $start_port" >&2
    return 1
}

# Main execution
if [ "$1" = "--check" ]; then
    check_port_available $2
    exit $?
elif [ "$1" = "--find" ]; then
    find_available_port $2
    exit $?
else
    echo "Usage: $0 --check <port>  |  $0 --find <start_port>"
    exit 1
fi
