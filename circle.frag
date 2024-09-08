#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Function to draw a triangle
float triangle(vec2 uv, vec2 p1, vec2 p2, vec2 p3) {
    vec2 v0 = p2 - p1;
    vec2 v1 = p3 - p1;
    vec2 v2 = uv - p1;
    
    float d00 = dot(v0, v0);
    float d01 = dot(v0, v1);
    float d11 = dot(v1, v1);
    float d20 = dot(v2, v0);
    float d21 = dot(v2, v1);
    
    float invDenom = 1.0 / (d00 * d11 - d01 * d01);
    float u = (d11 * d20 - d01 * d21) * invDenom;
    float v = (d00 * d21 - d01 * d20) * invDenom;
    
    return (u >= 0.0 && v >= 0.0 && (u + v) <= 1.0) ? 1.0 : 0.0;
}

// Function to draw a rectangle (trunk)
float rectangle(vec2 uv, vec2 pos, vec2 size) {
    vec2 halfSize = size * 0.5;
    vec2 min = pos - halfSize;
    vec2 max = pos + halfSize;
    return step(min.x, uv.x) * step(min.y, uv.y) * step(uv.x, max.x) * step(uv.y, max.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    if(uv.x > 0.1){
        uv.x-=0.5;
    
    // Tree color palette
    vec3 darkGreen = vec3(0.8314, 0.8745, 0.8431);
    vec3 lightGreen = vec3(0.0549, 0.2118, 0.0549);
    vec3 snowWhite = vec3(0.1412, 0.3412, 0.1569);
    vec3 trunkColor = vec3(0.4, 0.2, 0.1);  // Brownish color for the trunk
    
    // Draw tree layers (triangles)
    float t1 = triangle(uv, vec2(-0.2, -0.4), vec2(0.2, -0.4), vec2(0.0, 0.0));  // Lower triangle (tree)
    float t2 = triangle(uv, vec2(-0.3, -0.1), vec2(0.3, -0.1), vec2(0.0, 0.3));  // Middle triangle (tree)
    float t3 = triangle(uv, vec2(-0.3, 0.2), vec2(0.3, 0.2), vec2(0.0, 0.5));    // Top triangle (tree)
    
    // Combine the layers to form the tree
    float treeShape = max(t1, max(t2, t3));
    
    // Snow layer on top of the tree (simulated)
    float snowLayer = triangle(uv, vec2(-0.2, 0.1), vec2(0.2, 0.1), vec2(0.0, 0.4));
    
    // Add the trunk (rectangle right below the bottom triangle)
    float trunk = rectangle(uv, vec2(0., -0.2), vec2(0.1, 0.2));  // Slightly raise the position to align with the bottom
    
    // Mix colors based on the tree layers, snow, and trunk
    vec3 color = mix(darkGreen, lightGreen, t2 + t3);
    color = mix(color, snowWhite, snowLayer);
    color = mix(color, trunkColor, trunk);  // Add the trunk color
    
    gl_FragColor = vec4(color, 1.0);
    }

    else{
        uv.x += 0.5;
    
    // Tree color palette
    vec3 darkGreen = vec3(0.8314, 0.8745, 0.8431);
    vec3 lightGreen = vec3(0.0549, 0.2118, 0.0549);
    vec3 snowWhite = vec3(0.1412, 0.3412, 0.1569);
    vec3 trunkColor = vec3(0.4, 0.2, 0.1);  // Brownish color for the trunk
    
    // Draw tree layers (triangles)
    float t1 = triangle(uv, vec2(-0.2, -0.4), vec2(0.2, -0.4), vec2(0.0, 0.0));  // Lower triangle (tree)
    float t2 = triangle(uv, vec2(-0.3, -0.1), vec2(0.3, -0.1), vec2(0.0, 0.3));  // Middle triangle (tree)
    float t3 = triangle(uv, vec2(-0.3, 0.2), vec2(0.3, 0.2), vec2(0.0, 0.5));    // Top triangle (tree)
    
    // Combine the layers to form the tree
    float treeShape = max(t1, max(t2, t3));
    
    // Snow layer on top of the tree (simulated)
    float snowLayer = triangle(uv, vec2(-0.2, 0.1), vec2(0.2, 0.1), vec2(0.0, 0.4));
    
    // Add the trunk (rectangle right below the bottom triangle)
    float trunk = rectangle(uv, vec2(0., -0.2), vec2(0.1, 0.2));  // Slightly raise the position to align with the bottom
    
    // Mix colors based on the tree layers, snow, and trunk
    vec3 color = mix(darkGreen, lightGreen, t2 + t3);
    color = mix(color, snowWhite, snowLayer);
    color = mix(color, trunkColor, trunk);  // Add the trunk color
    
    gl_FragColor = vec4(color, 1.0);
    }
}
