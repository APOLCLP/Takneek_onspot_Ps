#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float riverPath(vec2 uv) {
    // Vary the amplitude based on the y-coordinate to make the river thicker at the bottom
    float amplitude = mix(0.15, 0.1, uv.y);  // Thicker at the bottom (0.5), thinner at the top (0.1)
    return 0.5 + amplitude * sin(uv.y * 10.0);
}

float riverWidth(vec2 uv, float path) {
    // Make the width also vary based on the y-coordinate
    float widthFactor = mix(0.2, 0.005, uv.y);  // Wider at the bottom, narrower at the top
    return smoothstep(widthFactor, widthFactor * 1.0, abs(uv.x - path));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    float path = riverPath(uv);
    float width = riverWidth(uv, path);
    
    // Base snow color
    vec3 color = vec3(1.0);
    
    // Apply river color within the width
    color = mix(vec3(0.1, 0.3, 0.5), color, width);
    
    // Add shading based on distance from the center of the river
    float shading = smoothstep(0.0, 0.1, abs(uv.x - path));
    color *= mix(1.0, 0.8, shading);
    
    // Output the final color
    gl_FragColor = vec4(color, 1.0);
}
