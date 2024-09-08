#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
// Function to generate the first river's path
float riverPath1(vec2 uv) {
    float amplitude = mix(0.15, 0.1, uv.y);  // Thicker at the bottom, thinner at the top
    return 0.5 + amplitude * sin(uv.y * 10.0);
}

// Function to control the first river's width
float riverWidth1(vec2 uv, float path) {
    float widthFactor = mix(0.2, 0.005, uv.y);  // Wider at the bottom, narrower at the top
    return smoothstep(widthFactor, widthFactor * 1.0, abs(uv.x - path));
}

// Function to generate the second river's path
float riverPath2(vec2 uv) {
    float amplitude = mix(0.11, 0.05, uv.y);  // Slightly thinner river
    return 0.25 + amplitude * abs(cos(uv.y * 8.0));  // Different frequency and shape (cosine)
}

// Function to control the second river's width
float riverWidth2(vec2 uv, float path) {
    float widthFactor = mix(0.15, 0.02, uv.y);  // Different width factor for the second river
    return smoothstep(widthFactor, widthFactor * 1.0, abs(uv.x - path));
}

// Function to generate the third river's path
float riverPath3(vec2 uv) {
    float amplitude = 0.05;  // Constant amplitude for simplicity
    return 0.33 + amplitude * abs(sin(uv.y * 12.0));  // Thinner, wavier river
}

// Function to control the third river's width, but only between y1 and y2
float riverWidth3(vec2 uv, float path, float y1, float y2) {
    float widthFactor = 0.05;  // Fixed width for the third river
    float width = smoothstep(widthFactor, widthFactor * 1.0, abs(uv.x - path));
    
    // Limit the river appearance between y1 and y2
    float yFactor = smoothstep(y1, y1 + 0.0, uv.y) * smoothstep(y2, y2-0.0000001, uv.y);
    
    return width * yFactor;  // Only render width between y1 and y2
}

float riverPath4(vec2 uv) {
    float amplitude = 0.1;  // Constant amplitude for simplicity
    return 0.85 + amplitude * -abs(sin(uv.y * 12.0));  // Thinner, wavier river
}

// Function to control the third river's width, but only between y1 and y2
float riverWidth4(vec2 uv, float path, float y1, float y2) {
    float widthFactor = 0.1;  // Fixed width for the third river
    float width = smoothstep(widthFactor, widthFactor * 1.0, abs(uv.x - path));
    
    // Limit the river appearance between y1 and y2
    float yFactor = smoothstep(y1, y1 + 0.0, uv.y) * smoothstep(y2, y2-0.0000001, uv.y);
    
    return width * yFactor;  // Only render width between y1 and y2
}

float riverPath5(vec2 uv) {
    float amplitude = 0.1;  // Constant amplitude for simplicity
    return 0.75 + amplitude * -abs(sin(uv.y * 12.0));  // Thinner, wavier river
}

// Function to control the third river's width, but only between y1 and y2
float riverWidth5(vec2 uv, float path, float y1, float y2) {
    float widthFactor = 0.1;  // Fixed width for the third river
    float width = smoothstep(widthFactor, widthFactor * 1.0, abs(uv.x - path));
    
    // Limit the river appearance between y1 and y2
    float yFactor = smoothstep(y1, y1 + 0.0, uv.y) * smoothstep(y2, y2-0.0000001, uv.y);
    
    return width * yFactor;  // Only render width between y1 and y2
}
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    // Define y1 and y2 for the third river
    float y0=0.7;// Base snow color
    vec3 color = vec3(1.0);
    if(uv.y<y0)
    {
        float y1 = 0.4;  // Start of the third river's range
        float y2 = 0.9;  // End of the third river's range
        
        float y3 = 0.;  // Start of the third river's range
        float y4 = 0.9;

        float y5 = 0.6;  // Start of the third river's range
        float y6 = 0.9;
        // First river calculations
        float path1 = riverPath1(uv);
        float width1 = riverWidth1(uv, path1);
        
        // Second river calculations
        float path2 = riverPath2(uv);
        float width2 = riverWidth2(uv, path2);
        
        // Third river calculations (between y1 and y2)
        float path3 = riverPath3(uv);
        float width3 = riverWidth3(uv, path3, y1, y2);
        
        float path4 = riverPath4(uv);
        float width4 = riverWidth4(uv, path4, y3, y4);

        float path5 = riverPath5(uv);
        float width5 = riverWidth5(uv, path5, y5, y6);
        
        // Apply first river color
        color = mix(vec3(0.1, 0.3, 0.5), color, width1);  // First river: blueish color
        
        // Apply second river color
        color = mix(vec3(1.0, 1.0, 1.0), color, width2);  // Second river: greenish color
        
        // Third river color within the y1 and y2 range
        if (uv.y > y1 && uv.y < y2) {
            color = mix(vec3(1.0, 1.0, 1.0), color, width3);  // Third river: reddish color
        }

        if (uv.y > y3 && uv.y < y4) {
            color = mix(vec3(1.0, 1.0, 1.0), color, width4);  // Third river: reddish color
        }

        if (uv.y > y5 && uv.y < y6) {
            color = mix(vec3(1.0, 1.0, 1.0), color, width5);  // Third river: reddish color
        }
        
        // Add shading to all rivers based on distance from the center
        float shading1 = smoothstep(0.0, 0.1, abs(uv.x - path1));
        float shading2 = smoothstep(0.0, 0.1, abs(uv.x - path2));
        float shading3 = smoothstep(0.0, 0.1, abs(uv.x - path3));
        float shading4 = smoothstep(0.0, 0.1, abs(uv.x - path4));
        
        color *= mix(1.0, 1.0, shading1);  // Apply shading for the first river
        color *= mix(1.0, 1.0, shading2);  // Apply shading for the second river
        color *= mix(1.0, 1.0, shading3);  // Apply shading for the third river
        color *= mix(1.0, 1.0, shading4);
    }
    
    // Output the final color
    gl_FragColor = vec4(color, 1.0);
}
