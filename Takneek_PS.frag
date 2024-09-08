#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float riverPath1(vec2 coord) {
    float amplitude = mix(0.15, 0.1, coord.y);  // Thicker at the bottom, thinner at the top
    return 0.5 + amplitude * sin(coord.y * 10.0);
}

// Function to control the first river's width
float riverWidth1(vec2 coord, float path) {
    float widthFactor = mix(0.2, 0.005, coord.y);  // Wider at the bottom, narrower at the top
    return smoothstep(widthFactor, widthFactor * 1.0, abs(coord.x - path));
}

// Function to generate the second river's path
float riverPath2(vec2 coord) {
    float amplitude = mix(0.11, 0.05, coord.y);  // Slightly thinner river
    return 0.25 + amplitude * abs(cos(coord.y * 8.0));  // Different frequency and shape (cosine)
}

// Function to control the second river's width
float riverWidth2(vec2 coord, float path) {
    float widthFactor = mix(0.15, 0.02, coord.y);  // Different width factor for the second river
    return smoothstep(widthFactor, widthFactor * 1.0, abs(coord.x - path));
}

// Function to generate the third river's path
float riverPath3(vec2 coord) {
    float amplitude = 0.05;  // Constant amplitude for simplicity
    return 0.33 + amplitude * abs(sin(coord.y * 12.0));  // Thinner, wavier river
}

// Function to control the third river's width, but only between y1 and y2
float riverWidth3(vec2 coord, float path, float y1, float y2) {
    float widthFactor = 0.05;  // Fixed width for the third river
    float width = smoothstep(widthFactor, widthFactor * 1.0, abs(coord.x - path));
    
    // Limit the river appearance between y1 and y2
    float yFactor = smoothstep(y1, y1 + 0.0, coord.y) * smoothstep(y2, y2-0.0000001, coord.y);
    
    return width * yFactor;  // Only render width between y1 and y2
}

float riverPath4(vec2 coord) {
    float amplitude = 0.1;  // Constant amplitude for simplicity
    return 0.85 + amplitude * -abs(sin(coord.y * 12.0));  // Thinner, wavier river
}

// Function to control the third river's width, but only between y1 and y2
float riverWidth4(vec2 coord, float path, float y1, float y2) {
    float widthFactor = 0.1;  // Fixed width for the third river
    float width = smoothstep(widthFactor, widthFactor * 1.0, abs(coord.x - path));
    
    // Limit the river appearance between y1 and y2
    float yFactor = smoothstep(y1, y1 + 0.0, coord.y) * smoothstep(y2, y2-0.0000001, coord.y);
    
    return width * yFactor;  // Only render width between y1 and y2
}

float riverPath5(vec2 coord) {
    float amplitude = 0.1;  // Constant amplitude for simplicity
    return 0.75 + amplitude * -abs(sin(coord.y * 12.0));  // Thinner, wavier river
}

// Function to control the third river's width, but only between y1 and y2
float riverWidth5(vec2 coord, float path, float y1, float y2) {
    float widthFactor = 0.1;  // Fixed width for the third river
    float width = smoothstep(widthFactor, widthFactor * 1.0, abs(coord.x - path));
    
    // Limit the river appearance between y1 and y2
    float yFactor = smoothstep(y1, y1 + 0.0, coord.y) * smoothstep(y2, y2-0.0000001, coord.y);
    
    return width * yFactor;  // Only render width between y1 and y2
}

float triangle(vec2 st, vec2 p0, vec2 p1, vec2 p2) {
    vec3 v0 = vec3(p1 - p0, 0.0);
    vec3 v1 = vec3(p2 - p1, 0.0);
    vec3 v2 = vec3(p0 - p2, 0.0);
    vec3 v = vec3(st - p0, 0.0);
    return min(min(cross(v0, v).z, cross(v1, vec3(st - p1, 0.0)).z), cross(v2, vec3(st - p2, 0.0)).z);
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    if(coord.y >0.7){
    vec3 color = vec3(1.0); //background colour
    
    //creating a triangle
    for(float i = -0.5; i<0.5; i+= 0.1){
    vec2 p1 = vec2(0.5+i, 0.7);
    vec2 p2 = vec2(0.5+i+0.2, 0.7);
    vec2 p3 = vec2(0.5+i+0.1, 0.8+i*i);
    float triVal = triangle(coord, p1, p2, p3);
     if(triVal>0.0){
        color = vec3(0.7,0.8,0.9);
    }
    }

    for(float i = -0.4; i<0.6; i+= 0.1){
    vec2 p1 = vec2(0.4+i, 0.67);
    vec2 p2 = vec2(0.4+i+0.15, 0.67);
    vec2 p3 = vec2(0.4+i+0.075, 0.77+i*i);
    float triVal = triangle(coord, p1, p2, p3);
     if(triVal>0.0){
        color = vec3(0.678, 0.76, 0.815);
    }
    }

    

    
    
    gl_FragColor = vec4(color, 1.0);
    }

    if(coord.y<0.7){
        vec3 color = vec3(1.0);
        float y1 = 0.4;  // Start of the third river's range
        float y2 = 0.9;  // End of the third river's range
        
        float y3 = 0.;  // Start of the third river's range
        float y4 = 0.9;

        float y5 = 0.6;  // Start of the third river's range
        float y6 = 0.9;
        // First river calculations
        float path1 = riverPath1(coord);
        float width1 = riverWidth1(coord, path1);
        
        // Second river calculations
        float path2 = riverPath2(coord);
        float width2 = riverWidth2(coord, path2);
        
        // Third river calculations (between y1 and y2)
        float path3 = riverPath3(coord);
        float width3 = riverWidth3(coord, path3, y1, y2);
        
        float path4 = riverPath4(coord);
        float width4 = riverWidth4(coord, path4, y3, y4);

        float path5 = riverPath5(coord);
        float width5 = riverWidth5(coord, path5, y5, y6);
        
        // Apply first river color
        color = mix(vec3(0.1, 0.3, 0.5), color, width1);  // First river: blueish color
        
        // Apply second river color
        color = mix(vec3(1.0, 1.0, 1.0), color, width2);  // Second river: greenish color
        
        // Third river color within the y1 and y2 range
        if (coord.y > y1 && coord.y < y2) {
            color = mix(vec3(1.0, 1.0, 1.0), color, width3);  // Third river: reddish color
        }

        if (coord.y > y3 && coord.y < y4) {
            color = mix(vec3(1.0, 1.0, 1.0), color, width4);  // Third river: reddish color
        }

        if (coord.y > y5 && coord.y < y6) {
            color = mix(vec3(1.0, 1.0, 1.0), color, width5);  // Third river: reddish color
        }
        
        // Add shading to all rivers based on distance from the center
        float shading1 = smoothstep(0.0, 0.1, abs(coord.x - path1));
        float shading2 = smoothstep(0.0, 0.1, abs(coord.x - path2));
        float shading3 = smoothstep(0.0, 0.1, abs(coord.x - path3));
        float shading4 = smoothstep(0.0, 0.1, abs(coord.x - path4));
        
        color *= mix(1.0, 1.0, shading1);  // Apply shading for the first river
        color *= mix(1.0, 1.0, shading2);  // Apply shading for the second river
        color *= mix(1.0, 1.0, shading3);  // Apply shading for the third river
        color *= mix(1.0, 1.0, shading4);

        gl_FragColor = vec4(color, 1.0);
    }

}
